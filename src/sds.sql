SELECT 
    X.Articulo,X.Nombre,X.ExistenciaActualRegular,X.UltimoCosto,
    Y.UCosto,Y.UltimaFecha, '===>' AS DAH ,Z.Precio1IVAUV, Z.UltimoCosto, Z.UltimoCostoNeto, Z.FechaUltimaModificacion
FROM QVExistencias AS X
LEFT JOIN (
    SELECT A.Articulo,A.UltimaFecha,UCosto = B.COSTO_UNIT_REG
    FROM (
        SELECT Articulo,UltimaFecha = MAX(Hora) FROM QVKardex 
        WHERE ES_ENTRADA = 1 AND Almacen = 3 AND NOT Tipo = 'X' GROUP BY Articulo
    ) AS A LEFT JOIN QVKardex B ON B.Articulo = A.Articulo AND B.Hora = A.UltimaFecha
) AS Y ON Y.Articulo = X.Articulo
LEFT JOIN QVListaprecioConCosto AS Z ON Z.Articulo = X.Articulo AND Z.Tienda = 2 AND Z.Almacen = 3
WHERE X.Almacen = 3 AND X.Tienda = 2
    AND X.ExistenciaActualRegular > 0
    AND NOT ROUND(X.UltimoCosto,0) = ROUND(Y.UCosto,0)
ORDER BY UltimaFecha


-- Select rows from a Table or View 'QVKardez' in schema 'SchemaName'
SELECT * FROM dbo.QVKardex
WHERE Articulo = '0175001'	/* add search conditions here */
GO