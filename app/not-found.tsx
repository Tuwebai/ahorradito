import Link from "next/link"
import { Home, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-8 p-8">
        <div className="space-y-4">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <h2 className="text-3xl font-bold text-foreground">Página no encontrada</h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Volver al inicio
            </Link>
          </Button>
          
          <Button variant="outline" asChild>
            <Link href="/productos" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Buscar productos
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 