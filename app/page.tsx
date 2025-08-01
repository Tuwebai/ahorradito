"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Filters from "@/components/filters"
import ProductsTable from "@/components/products-table"
import EnhancedStats from "@/components/enhanced-stats"
import FeaturedProducts from "@/components/featured-products"
import Footer from "@/components/footer"
import ProductsGrid from "@/components/products-grid"
import { DataService } from "@/lib/data-service"
import type { ProductoConPrecios } from "@/types"

export default function Home() {
  const [productos, setProductos] = useState<ProductoConPrecios[]>([])
  const [ciudades, setCiudades] = useState<string[]>([])
  const [categorias, setCategorias] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  // Filtros
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("todas")
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todas")
  const [busqueda, setBusqueda] = useState("")

  // Cargar datos iniciales
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [ciudadesData, categoriasData] = await Promise.all([
          DataService.getCiudades(),
          DataService.getCategorias(),
        ])

        setCiudades(ciudadesData)
        setCategorias(categoriasData)
      } catch (error) {
        console.error("Error cargando datos:", error)
      }
    }

    cargarDatos()
  }, [])

  // Cargar productos cuando cambian los filtros
  useEffect(() => {
    const cargarProductos = async () => {
      setLoading(true)
      try {
        const productosData = await DataService.getProductosConPrecios(
          ciudadSeleccionada === "todas" ? undefined : ciudadSeleccionada,
          categoriaSeleccionada === "todas" ? undefined : categoriaSeleccionada,
          busqueda || undefined,
        )

        setProductos(productosData)
      } catch (error) {
        console.error("Error cargando productos:", error)
      } finally {
        setLoading(false)
      }
    }

    cargarProductos()
  }, [ciudadSeleccionada, categoriaSeleccionada, busqueda])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header productos={productos} />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-10">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-primary hover:text-primary/80 transition-colors duration-200">Ahorradito</span>
            </h1>
            <p className="text-2xl md:text-3xl text-foreground mb-8 leading-relaxed">
              Compará precios de supermercados y <span className="text-secondary font-bold">ahorrá</span> en tus
              compras
            </p>
            <p className="text-muted-foreground max-w-3xl mx-auto mb-10 text-lg leading-relaxed">
              Encontrá los mejores precios en supermercados de tu ciudad. Comparamos productos de múltiples cadenas para
              que puedas tomar la mejor decisión de compra.
            </p>

            {/* Indicadores rápidos */}
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center space-x-3 bg-surface px-6 py-3 rounded-full border border-border shadow-dark hover:shadow-dark-lg transition-all duration-200">
                <div className="w-3 h-3 bg-secondary rounded-full shadow-glow-green"></div>
                <span className="text-muted-foreground font-medium">30 productos disponibles</span>
              </div>
              <div className="flex items-center space-x-3 bg-surface px-6 py-3 rounded-full border border-border shadow-dark hover:shadow-dark-lg transition-all duration-200">
                <div className="w-3 h-3 bg-primary rounded-full shadow-glow-blue"></div>
                <span className="text-muted-foreground font-medium">10 supermercados</span>
              </div>
              <div className="flex items-center space-x-3 bg-surface px-6 py-3 rounded-full border border-border shadow-dark hover:shadow-dark-lg transition-all duration-200">
                <div className="w-3 h-3 bg-secondary rounded-full shadow-glow-green"></div>
                <span className="text-muted-foreground font-medium">4 ciudades</span>
              </div>
            </div>
          </div>

          {/* Filtros */}
          <div className="mb-10">
            <Filters
              ciudades={ciudades}
              categorias={categorias}
              ciudadSeleccionada={ciudadSeleccionada}
              categoriaSeleccionada={categoriaSeleccionada}
              busqueda={busqueda}
              onCiudadChange={setCiudadSeleccionada}
              onCategoriaChange={setCategoriaSeleccionada}
              onBusquedaChange={setBusqueda}
            />
          </div>

          {/* Estadísticas mejoradas */}
          <EnhancedStats productos={productos} ciudadSeleccionada={ciudadSeleccionada} />

          {/* Productos destacados */}
          {!loading && productos.length > 0 && <FeaturedProducts productos={productos} />}

          {/* Tabla de productos */}
          <div className="space-y-10">
            <ProductsTable productos={productos} loading={loading} />

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">Vista de productos</h2>
              <ProductsGrid productos={productos} loading={loading} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
