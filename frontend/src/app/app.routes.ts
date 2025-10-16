import { Routes } from '@angular/router';
import { Productos } from './productos/productos';
import { Transacciones } from './transacciones/transacciones';
import { CrearProducto } from './crear-producto/crear-producto';
import { EditarProducto } from './editar-producto/editar-producto';
import { TransaccionesCrear } from './transacciones-crear/transacciones-crear';
import { Busqueda } from './busqueda/busqueda';

export const routes: Routes = [
    {
        path: "productos",
        component: Productos
    },
    {
        path: "productos/crear",
        component: CrearProducto
    },
    {
        path: "productos/editar/:id",
        component: EditarProducto
    },
    {
        path: "transacciones",
        component: Transacciones
    },
    {
        path: "transacciones/crear",
        component: TransaccionesCrear
    },
    {
        path: "busqueda",
        component: Busqueda
    }
];
