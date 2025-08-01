"use client"

import { Search, Filter, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FiltersProps {
  ciudades: string[]
  categorias: string[]
  ciudadSeleccionada: string
  categoriaSeleccionada: string
  busqueda: string
  onCiudadChange: (ciudad: string) => void
  onCategoriaChange: (categoria: string) => void
  onBusquedaChange: (busqueda: string) => void
}

export default function Filters({
  ciudades,
  categorias,
  ciudadSeleccionada,
  categoriaSeleccionada,
  busqueda,
  onCiudadChange,
  onCategoriaChange,
  onBusquedaChange,
}: FiltersProps) {
  return (
    <div className="bg-surface p-6 rounded-xl border border-border shadow-dark-lg animate-fade-in hover:shadow-glow-blue transition-all duration-300">
      <div className="flex items-center space-x-3 mb-5">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Filter className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">Filtros de búsqueda</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Selector de ciudad */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span>Ciudad</span>
          </label>
          <Select value={ciudadSeleccionada} onValueChange={onCiudadChange}>
            <SelectTrigger className="bg-background border-border text-foreground hover:border-primary focus:border-primary transition-all duration-200 h-11">
              <SelectValue placeholder="Seleccionar ciudad" />
            </SelectTrigger>
            <SelectContent className="bg-surface border-border shadow-dark-lg">
              <SelectItem value="todas" className="text-foreground hover:bg-primary/10 focus:bg-primary/10">Todas las ciudades</SelectItem>
              {ciudades.map((ciudad) => (
                <SelectItem key={ciudad} value={ciudad} className="text-foreground hover:bg-primary/10 focus:bg-primary/10">
                  {ciudad}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Selector de categoría */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground flex items-center space-x-2">
            <span>📂</span>
            <span>Categoría</span>
          </label>
          <Select value={categoriaSeleccionada} onValueChange={onCategoriaChange}>
            <SelectTrigger className="bg-background border-border text-foreground hover:border-primary focus:border-primary transition-all duration-200 h-11">
              <SelectValue placeholder="Seleccionar categoría" />
            </SelectTrigger>
            <SelectContent className="bg-surface border-border shadow-dark-lg">
              <SelectItem value="todas" className="text-foreground hover:bg-primary/10 focus:bg-primary/10">Todas las categorías</SelectItem>
              {categorias.map((categoria) => (
                <SelectItem key={categoria} value={categoria} className="text-foreground hover:bg-primary/10 focus:bg-primary/10">
                  {categoria}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Buscador */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground flex items-center space-x-2">
            <span>🔍</span>
            <span>Buscar producto</span>
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Ej: leche, pan, arroz..."
              value={busqueda}
              onChange={(e) => onBusquedaChange(e.target.value)}
              className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground hover:border-primary focus:border-primary transition-all duration-200 h-11"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
