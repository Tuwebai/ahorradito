'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-md">
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Algo salió mal</h1>
          <p className="text-muted-foreground">
            Ha ocurrido un error inesperado. Por favor, intenta de nuevo.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={reset}
            className="bg-primary hover:bg-primary/90"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Intentar de nuevo
          </Button>
          
          <Button variant="outline" asChild>
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Volver al inicio
            </Link>
          </Button>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <details className="text-left">
            <summary className="cursor-pointer text-sm text-muted-foreground">
              Detalles del error (solo desarrollo)
            </summary>
            <pre className="mt-2 text-xs bg-muted p-4 rounded-lg overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
} 