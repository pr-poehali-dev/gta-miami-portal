import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [onlinePlayers] = useState(247);
  const [maxPlayers] = useState(500);

  // AnyPay integration function
  const handlePurchase = (price: string, packageName: string) => {
    const amount = parseInt(price.replace('₽', ''));
    const projectId = '15804';
    const secretKey = '89059293040Va';
    const orderId = `order_${Date.now()}`;
    
    // Create payment parameters for AnyPay
    const paymentParams = new URLSearchParams({
      merchant_id: projectId,
      amount: amount.toString(),
      currency: 'RUB',
      desc: packageName,
      order_id: orderId,
      success_url: 'https://miami-roleplay.ru/success',
      fail_url: 'https://miami-roleplay.ru/fail'
    });
    
    // Generate signature (simplified for demo, use proper MD5 in production)
    const signString = `${projectId}:${amount}:${secretKey}:RUB:${orderId}`;
    const sign = btoa(signString);
    paymentParams.append('sign', sign);
    
    const paymentUrl = `https://anypay.io/merchant?${paymentParams.toString()}`;
    window.open(paymentUrl, '_blank');
  };

  const donationPackages = [
    {
      title: "VIP Package",
      price: "₽499",
      features: ["Эксклюзивные автомобили", "Приоритетная поддержка", "VIP-чат", "Бонусы к зарплате"],
      popular: false
    },
    {
      title: "Premium Package",
      price: "₽999", 
      features: ["Все VIP преимущества", "Доступ к премиум локациям", "Эксклюзивная одежда", "Персональный гараж"],
      popular: true
    },
    {
      title: "Elite Package",
      price: "₽1999",
      features: ["Все Premium преимущества", "Личный остров", "Эксклюзивные миссии", "Приоритет входа"],
      popular: false
    }
  ];

  const navigationItems = [
    { icon: "Home", label: "Главная", href: "#hero" },
    { icon: "DollarSign", label: "Донат", href: "#donate" },
    { icon: "MessageCircle", label: "Форум", href: "#forum" },
    { icon: "Users", label: "О нас", href: "#about" },
    { icon: "Activity", label: "Мониторинг", href: "#monitoring" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 miami-gradient rounded-lg flex items-center justify-center font-bold text-2xl text-white shadow-lg glow-cyan">
                M
              </div>
              <h1 className="text-xl font-bold miami-text-gradient">Miami RP</h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  <Icon name={item.icon as any} size={16} />
                  <span>{item.label}</span>
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <a href="https://vk.com/miamirp" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="bg-blue-600 border-none text-white hover:opacity-80 glow-orange">
                  <Icon name="MessageSquare" size={16} />
                </Button>
              </a>
              <a href="https://discord.gg/miamirp" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="bg-indigo-600 border-none text-white hover:opacity-80 glow-orange">
                  <Icon name="MessageCircle" size={16} />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-20 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 miami-gradient opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold miami-text-gradient animate-fade-in">
                Miami RP
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Окунись в мир роскошного Майами. Создай свою историю в лучшем RolePlay сервере GTA V
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="miami-gradient text-white hover:opacity-90 glow-cyan animate-pulse-glow">
                <Icon name="Play" size={20} className="mr-2" />
                Начать игру
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                <Icon name="Download" size={20} className="mr-2" />
                Скачать лаунчер
              </Button>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto border glow-cyan">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Онлайн игроков</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-500">Онлайн</span>
                </div>
              </div>
              <div className="text-2xl font-bold mb-2 miami-text-gradient">{onlinePlayers}/{maxPlayers}</div>
              <Progress value={(onlinePlayers / maxPlayers) * 100} className="h-3 [&>div]:miami-gradient" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 miami-text-gradient">
            Почему выбирают нас?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "Zap",
                title: "Высокая производительность",
                description: "Стабильный сервер без лагов и с минимальным пингом"
              },
              {
                icon: "Shield",
                title: "Честная игра",
                description: "Строгая модерация и защита от читеров"
              },
              {
                icon: "Users",
                title: "Дружное сообщество",
                description: "Активное комьюнити и отзывчивая администрация"
              }
            ].map((feature, index) => (
              <Card key={index} className="bg-card/50 border-border hover:glow-cyan transition-all duration-300 animate-float" style={{animationDelay: `${index * 0.2}s`}}>
                <CardHeader className="text-center">
                  <div className="w-12 h-12 mx-auto miami-gradient rounded-lg flex items-center justify-center mb-4">
                    <Icon name={feature.icon as any} size={24} className="text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Donate Section */}
      <section id="donate" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 miami-text-gradient">Донат-пакеты</h2>
            <p className="text-muted-foreground">Поддержи сервер и получи эксклюзивные преимущества</p>
            <div className="mt-4 p-3 bg-primary/10 rounded-lg inline-block">
              <p className="text-sm text-primary flex items-center">
                <Icon name="ShieldCheck" size={16} className="mr-2" />
                Безопасная оплата через AnyPay
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {donationPackages.map((pkg, index) => (
              <Card 
                key={index} 
                className={`relative bg-card/50 border-border hover:glow-cyan transition-all duration-300 ${
                  pkg.popular ? 'ring-2 ring-primary scale-105 glow-orange' : ''
                }`}
              >
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 miami-gradient text-white animate-pulse">
                    Популярный
                  </Badge>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{pkg.title}</CardTitle>
                  <CardDescription>
                    <span className="text-3xl font-bold text-primary">{pkg.price}</span>
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <Icon name="Check" size={16} className="text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      pkg.popular 
                        ? 'miami-gradient text-white hover:opacity-90 glow-cyan' 
                        : 'border-primary text-primary hover:bg-primary/10'
                    }`}
                    variant={pkg.popular ? 'default' : 'outline'}
                    onClick={() => handlePurchase(pkg.price, pkg.title)}
                  >
                    <Icon name="CreditCard" size={16} className="mr-2" />
                    Купить через AnyPay
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Monitoring Section */}
      <section id="monitoring" className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 miami-text-gradient">
            Мониторинг сервера
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Онлайн", value: `${onlinePlayers}/${maxPlayers}`, icon: "Users", color: "text-green-500" },
              { label: "Аптайм", value: "99.9%", icon: "Activity", color: "text-blue-500" },
              { label: "Пинг", value: "25ms", icon: "Wifi", color: "text-yellow-500" },
              { label: "TPS", value: "20.0", icon: "Zap", color: "text-purple-500" }
            ].map((stat, index) => (
              <Card key={index} className="bg-card/50 border-border text-center hover:glow-cyan transition-all duration-300">
                <CardContent className="pt-6">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-muted/50 flex items-center justify-center ${stat.color} animate-pulse`}>
                    <Icon name={stat.icon as any} size={24} />
                  </div>
                  <div className="text-2xl font-bold mb-1 miami-text-gradient">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 miami-text-gradient">О проекте Miami RP</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-lg text-muted-foreground">
              Miami RolePlay — это уникальный игровой мир, где каждый может стать тем, кем захочет. 
              Наш сервер предлагает самые реалистичные механики игры и безграничные возможности для творчества.
            </p>
            <p className="text-muted-foreground">
              Мы создали атмосферу настоящего Майами 80-х годов с неоновыми огнями, роскошными автомобилями 
              и захватывающими историями. Присоединяйся к нашему сообществу и создавай свою легенду!
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {[
                { number: "500+", label: "Игроков онлайн" },
                { number: "24/7", label: "Поддержка" },
                { number: "99%", label: "Время работы" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold miami-text-gradient">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Forum Section */}
      <section id="forum" className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 miami-text-gradient">
            Форум сообщества
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Общий чат", posts: 1247, icon: "MessageCircle" },
              { title: "Новости", posts: 89, icon: "Newspaper" },
              { title: "Помощь", posts: 432, icon: "HelpCircle" },
              { title: "Предложения", posts: 256, icon: "Lightbulb" },
              { title: "Жалобы", posts: 123, icon: "Flag" },
              { title: "Развлечения", posts: 789, icon: "Gamepad2" }
            ].map((category, index) => (
              <Card key={index} className="bg-card/50 border-border hover:glow-cyan transition-all duration-300 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Icon name={category.icon as any} size={20} className="text-primary" />
                      <span>{category.title}</span>
                    </CardTitle>
                    <Badge variant="outline" className="border-primary/50">{category.posts}</Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-10 h-10 miami-gradient rounded-lg flex items-center justify-center font-bold text-2xl text-white shadow-lg glow-cyan">
                M
              </div>
              <h3 className="text-xl font-bold miami-text-gradient">Miami RP</h3>
            </div>
            
            <div className="flex justify-center space-x-6">
              <a href="https://vk.com/miamirp" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm" className="hover:text-primary">
                  <Icon name="MessageSquare" size={16} className="mr-2" />
                  VK
                </Button>
              </a>
              <a href="https://discord.gg/miamirp" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm" className="hover:text-primary">
                  <Icon name="MessageCircle" size={16} className="mr-2" />
                  Discord
                </Button>
              </a>
            </div>
            
            <div className="text-sm text-muted-foreground space-y-1">
              <p>© 2024 Miami RolePlay. Все права защищены.</p>
              <p>Не связан с Rockstar Games или Take-Two Interactive</p>
              <p className="text-xs">Платежи обрабатываются через AnyPay • ID проекта: 15804</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}