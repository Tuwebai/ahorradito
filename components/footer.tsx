import { Mail, Phone, Github, Twitter, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-12 shadow-dark-lg">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Información del proyecto */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">Ahorradito</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Comparador de precios de supermercados para ayudarte a ahorrar en tus compras diarias.
            </p>
            <p className="text-muted-foreground text-xs">© 2024 Ahorradito. Todos los derechos reservados.</p>
          </div>

          {/* Enlaces útiles */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-lg">Enlaces útiles</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/como-funciona" className="text-muted-foreground hover:text-primary transition-all duration-200 font-medium">
                  Cómo funciona
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-all duration-200 font-medium">
                  Términos y condiciones
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-all duration-200 font-medium">
                  Política de privacidad
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-all duration-200 font-medium">
                  Preguntas frecuentes
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-lg">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-all duration-200">
                <Mail className="h-4 w-4" />
                <span className="font-medium">info@ahorradito.com.ar</span>
              </li>
              <li className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-all duration-200">
                <Phone className="h-4 w-4" />
                <span className="font-medium">+54 11 1234-5678</span>
              </li>
            </ul>
          </div>

          {/* Redes sociales */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-lg">Seguinos</h4>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200" 
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200" 
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200" 
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
