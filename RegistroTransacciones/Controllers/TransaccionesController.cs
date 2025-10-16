using Microsoft.AspNetCore.Mvc;
using RegistroTransacciones.Models;

namespace RegistroTransacciones.Controllers
{
    public class TransaccionesController : Controller
    {
        private RegistrotransaccionesdbContext _registrotransaccionesdbContext;
        private HttpClient _httpClient;
        private string url = "http://gestionproductos:7030";

        public TransaccionesController(RegistrotransaccionesdbContext registrotransaccionesdbContext, HttpClient httpClient)
        {
            _registrotransaccionesdbContext = registrotransaccionesdbContext;
            _httpClient = httpClient;
        }

        [HttpGet("api/transaccion")]
        public IActionResult GetTransaction()
        {
            try
            {
                return Ok(_registrotransaccionesdbContext.Transaccions.ToList());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

            return BadRequest();
        }

        [HttpPost("api/transaccion")]
        public async Task<IActionResult> CreateTransaction([FromBody] Transaccion transaccion)
        {
            try
            {
                var producto = await _httpClient.GetFromJsonAsync<Producto>($"{url}/api/producto/{transaccion.ProductoId}");

                if (transaccion.TipoTransaccion == "venta")
                {
                    if (transaccion.Cantidad > producto.Stock)
                    {
                        return BadRequest("La cantidad solicitada supera al stock");
                    }

                    producto.Stock = producto.Stock - transaccion.Cantidad;
                }

                if (transaccion.TipoTransaccion == "compra")
                {
                    producto.Stock = producto.Stock + transaccion.Cantidad;
                }

                var response = await _httpClient.PutAsJsonAsync<Producto>($"{url}/api/producto",producto);

                transaccion.PrecioUnitario = producto.Precio;
                transaccion.PrecioTotal = producto.Precio * transaccion.Cantidad;

                await _registrotransaccionesdbContext.Transaccions.AddAsync(transaccion);
                await _registrotransaccionesdbContext.SaveChangesAsync();

                return Created();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return BadRequest();
        }

        [HttpPut("api/transaccion")]
        public async Task<IActionResult> UpdateTransaction([FromBody] Transaccion editTransaccion)
        {
            try
            {
                var transaccion = _registrotransaccionesdbContext.Transaccions.FirstOrDefault(transaccion => transaccion.TransaccionId == editTransaccion.TransaccionId);

                transaccion.Fecha = editTransaccion.Fecha;
                transaccion.TipoTransaccion = editTransaccion.TipoTransaccion;
                transaccion.ProductoId = editTransaccion.ProductoId;
                transaccion.Cantidad = editTransaccion.Cantidad;
                transaccion.PrecioUnitario = editTransaccion.PrecioUnitario;
                transaccion.PrecioTotal = editTransaccion.PrecioTotal;
                transaccion.Detalle = editTransaccion.Detalle;

                _registrotransaccionesdbContext.Transaccions.Update(transaccion);
                await _registrotransaccionesdbContext.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return BadRequest();
        }

        [HttpDelete("api/transaccion")]
        public async Task<IActionResult> DeleteTransaction([FromBody] int transaccionId)
        {
            try
            {
                var transaccion = _registrotransaccionesdbContext.Transaccions.FirstOrDefault(transaccion => transaccion.TransaccionId == transaccionId);

                _registrotransaccionesdbContext.Transaccions.Remove(transaccion);
                await _registrotransaccionesdbContext.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return BadRequest();
        }

        [HttpGet("api/transaccion/{transaccionId:int}")]
        public IActionResult GetProductById(int transaccionId)
        {
            try
            {
                var transaccion = _registrotransaccionesdbContext.Transaccions.FirstOrDefault(transaccion => transaccion.TransaccionId == transaccionId);
                return Ok(transaccion);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

            return BadRequest();
        }

    }
}
