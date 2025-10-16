using GestionProductos.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace GestionProductos.Controllers
{
    public class ProductosController : Controller
    {
        private GestionproductosdbContext _gestionproductosdbContext;

        public ProductosController(GestionproductosdbContext gestionproductosdbContext)
        {
            _gestionproductosdbContext = gestionproductosdbContext;
        }

        [HttpGet("api/producto")]
        public IActionResult GetProducts()
        {
            try
            {
                return Ok(_gestionproductosdbContext.Productos.ToList());
            }
            catch (Exception ex) { 
                Console.WriteLine(ex.ToString());
            }

            return BadRequest();
        }

        [HttpGet("api/producto/{productoId:int}")]
        public IActionResult GetProductById(int productoId)
        {
            try
            {
                var producto = _gestionproductosdbContext.Productos.FirstOrDefault(producto => producto.ProductoId == productoId);
                return Ok(producto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

            return BadRequest();
        }

        [HttpPost("api/producto")]
        public async Task<IActionResult> CreateProduct([FromBody] Producto producto)
        {
            try
            {
                await _gestionproductosdbContext.Productos.AddAsync(producto);
                await _gestionproductosdbContext.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return BadRequest();
        }

        [HttpPut("api/producto")]
        public async Task<IActionResult> UpdateProduct([FromBody] Producto editProduct)
        {
            try
            {
                var producto = _gestionproductosdbContext.Productos.FirstOrDefault(producto => producto.ProductoId == editProduct.ProductoId);

                producto.Nombre = editProduct.Nombre;
                producto.Descripcion = editProduct.Descripcion;
                producto.Categoria = editProduct.Categoria;
                producto.Imagen = editProduct.Imagen;
                producto.Precio = editProduct.Precio;
                producto.Stock = editProduct.Stock;

                _gestionproductosdbContext.Productos.Update(producto);
                await _gestionproductosdbContext.SaveChangesAsync();

                return Ok(producto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return BadRequest(editProduct);
        }

        [HttpDelete("api/producto")]
        public async Task<IActionResult> DeleteProduct([FromBody] int productoId)
        {
            try
            {
                var producto = _gestionproductosdbContext.Productos.FirstOrDefault(producto => producto.ProductoId == productoId);

                _gestionproductosdbContext.Productos.Remove(producto);
                await _gestionproductosdbContext.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return BadRequest();
        }

    }
}
