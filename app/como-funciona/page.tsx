import { CheckCircle, Search, TrendingDown, ShoppingCart, Bell } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ComoFunciona() {
  const pasos = [
    {
      icon: Search,
      titulo: "Buscá productos",
      descripcion: "Usá nuestro buscador para encontrar los productos que necesitás o navegá por categorías.",
    },
    {
      icon: TrendingDown,
      titulo: "Comparamos precios",
      descripcion: "Mostramos los precios de diferentes supermercados en tiempo real para que puedas comparar.",
    },
    {
      icon: ShoppingCart,
      titulo: "Armá tu carrito",
      descripcion: "Agregá productos a tu carrito y te mostramos dónde te conviene comprar todo junto.",
    },
    {
      icon: Bell,
      titulo: "Recibí alertas",
      descripcion: "Configurá alertas de precios para tus productos favoritos y ahorrá aún más.",
    },
  ]

  const beneficios = [
    "Ahorrá tiempo comparando precios de múltiples supermercados",
    "Encontrá las mejores ofertas en tu ciudad",
    "Optimizá tu presupuesto familiar",
    "Recibí notificaciones cuando bajen los precios",
    "Planificá tus compras de manera inteligente",
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-16">
        {/* Hero */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-8">
            <span className="text-primary hover:text-primary/80 transition-colors duration-200">¿Cómo funciona</span> <span className="text-foreground">Ahorradito?</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Te explicamos paso a paso cómo usar nuestra plataforma para ahorrar en tus compras del supermercado
          </p>
        </div>

        {/* Pasos */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">Seguí estos simples pasos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pasos.map((paso, index) => (
              <div key={index} className="text-center">
                <div className="bg-surface border border-border rounded-xl p-8 mb-4 hover:border-primary/50 transition-all duration-300 shadow-dark hover:shadow-dark-lg hover-glow-blue">
                  <div className="bg-primary/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-dark">
                    <paso.icon className="h-10 w-10 text-primary" />
                  </div>
                  <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-6 text-sm font-bold shadow-glow-blue">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{paso.titulo}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{paso.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Beneficios */}
        <div className="bg-surface border border-border rounded-xl p-10 mb-20 shadow-dark-lg">
          <h2 className="text-4xl font-bold text-center mb-10 text-foreground">¿Por qué usar Ahorradito?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {beneficios.map((beneficio, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-background/50 rounded-lg border border-border/50">
                <CheckCircle className="h-7 w-7 text-secondary flex-shrink-0 mt-1 shadow-glow-green" />
                <p className="text-foreground font-medium leading-relaxed">{beneficio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 rounded-xl p-10 shadow-dark-lg hover:shadow-glow-blue transition-all duration-300">
          <h2 className="text-3xl font-bold text-foreground mb-6">¿Listo para empezar a ahorrar?</h2>
          <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
            Comenzá a comparar precios ahora y descubrí cuánto podés ahorrar en tus compras
          </p>
          <a
            href="/"
            className="inline-flex items-center space-x-3 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all duration-200 shadow-glow-blue hover:shadow-glow-blue/80"
          >
            <ShoppingCart className="h-6 w-6" />
            <span>Empezar a comparar</span>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  )
}
