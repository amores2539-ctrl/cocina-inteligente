export interface Benefit {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface Chapter {
  id: string;
  numLabel: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface Bonus {
  id: string;
  title: string;
  subtitle: string;
  value: string;
  description: string;
  bullets: string[];
}

export interface Plan {
  id: string;
  name: string;
  title: string;
  price: string;
  originalPrice: string;
  isPopular: boolean;
  badge?: string;
  deliverables: string[];
  bonuses: string[];
  uncludedBonuses?: string[];
  ctaText: string;
  checkoutUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  avatar: string;
  rating: number;
  text: string;
}

export interface FAQItem {
  id: string;
  number: string;
  question: string;
  answer: string;
}

export interface Recipe {
  id: string;
  title: string;
  category: 'Desayunos' | 'Almuerzos' | 'Cenas' | 'Acompañamientos' | 'Salsas';
  prepTime: string;
  freezeTime: string;
  servings: number;
  description: string;
  ingredients: string[];
  instructions: string[];
  tips: string;
  image: string;
  isGlutenFree?: boolean;
  isLactoseFree?: boolean;
}

export const BENEFITS: Benefit[] = [
  {
    id: 'b1',
    number: '01',
    title: 'Planificación Cero Estrés',
    description: 'Decide el menú de toda la semana en 15 minutos. Sabrás exactamente qué comprar y qué cocinar, eliminando la fatiga de decisión diaria.'
  },
  {
    id: 'b2',
    number: '02',
    title: 'Técnicas de Congelación Correctas',
    description: 'Aprende qué alimentos se pueden congelar, cuáles no, y los tiempos exactos para que la comida mantenga su textura, color y sabor original intactos.'
  },
  {
    id: 'b3',
    number: '03',
    title: 'Cocina en Bloques de 2 Horas',
    description: 'Aplica el método de "Batch Cooking" inteligente para cocinar una sola vez al fin de semana y disfrutar de platos frescos y caseros de lunes a viernes.'
  },
  {
    id: 'b4',
    number: '04',
    title: 'Ahorro de Dinero Garantizado',
    description: 'Reduce el desperdicio de alimentos al mínimo y evita pedir comida a domicilio de última hora por falta de tiempo o energía.'
  },
  {
    id: 'b5',
    number: '05',
    title: 'Porciones Equilibradas y Nutritivas',
    description: 'Nuestras recetas están diseñadas por expertos para asegurar que cada porción sea saciante, saludable y llena de nutrientes esenciales.'
  },
  {
    id: 'b6',
    number: '06',
    title: 'Seguridad Alimentaria Absoluta',
    description: 'Conoce los contenedores ideales y las pautas seguras de descongelación para cuidar de la salud de tu familia sin correr riesgos.'
  }
];

export const CHAPTERS: Chapter[] = [
  {
    id: 'c1',
    numLabel: 'CAPÍTULO I',
    title: 'El Método Batch Cooking',
    subtitle: 'EFICIENCIA EN LA COCINA',
    description: 'La guía paso a paso para organizar tus 2 horas de cocina dominical. Secuencias óptimas de uso del horno, hornallas y procesadores.'
  },
  {
    id: 'c2',
    numLabel: 'CAPÍTULO II',
    title: 'La Sesión Semanal',
    subtitle: 'ORGANIZACIÓN PASO A PASO',
    description: 'La guía práctica y cronograma detallado para llevar a cabo tu sesión de cocina de la semana en menos de 2 horas, optimizando cada proceso.'
  },
  {
    id: 'c3',
    numLabel: 'CAPÍTULO III',
    title: 'Cómo conservar sin perder sabor',
    subtitle: 'PRESERVACIÓN Y CALIDAD',
    description: 'Técnicas y secretos para envasar y almacenar tus comidas evitando que pierdan textura, aroma o su sabor original al momento de recalentar.'
  },
  {
    id: 'c4',
    numLabel: 'CAPÍTULO IV',
    title: 'Desayunos Fit',
    subtitle: 'ENERGÍA Y NUTRICIÓN DESDE TEMPRANO',
    description: 'Recetas de desayunos saludables, proteicos y listos para congelar o preparar en minutos, optimizando tus mañanas.'
  },
  {
    id: 'c5',
    numLabel: 'CAPÍTULO V',
    title: 'Almuerzos y Cenas – Proteínas',
    subtitle: 'COMIDAS COMPLETAS Y SACIANTES',
    description: 'Preparaciones y recetas principales ricas en proteínas, diseñadas para fraccionar, congelar y resolver tus almuerzos y cenas de forma rápida y saludable.'
  },
  {
    id: 'c6',
    numLabel: 'CAPÍTULO VI',
    title: 'Almuerzos y Cenas – Vegetarianas/Legumbres',
    subtitle: 'SABOR Y NUTRICIÓN NATURAL',
    description: 'Deliciosos platos basados en plantas, legumbres y vegetales de estación, estructurados y optimizados para el congelador sin perder su consistencia.'
  }
];

export const BONUSES: Bonus[] = [
  {
    id: 'bo1',
    title: 'Planificador de Menú Semanal',
    subtitle: 'PLANTILLAS INTERACTIVAS',
    value: '$15.00',
    description: 'Planillas digitales listas para organizar tu semana culinaria y generar tu lista de compras automáticamente de forma visual.',
    bullets: [
      'Visualizador semanal de desayunos, almuerzos y cenas',
      'Calculador automático de porciones e ingredientes',
      'Formato PDF imprimible y versión digital reusable'
    ]
  },
  {
    id: 'bo2',
    title: 'Guía de Gestión del Congelador',
    subtitle: 'CONTROL Y ROTACIÓN INTELIGENTE',
    value: '$12.00',
    description: 'Técnicas avanzadas para etiquetar, ordenar y rotar tus alimentos de forma simple y visual, evitando vencimientos y desperdicio.',
    bullets: [
      'Sistema visual de control de stock y etiquetas reutilizables',
      'Métodos de rotación FIFO (Primero en entrar, primero en salir)',
      'Formatos optimizados de inventario listos para imprimir'
    ]
  },
  {
    id: 'bo3',
    title: 'Plan de Viandas Organizadas',
    subtitle: 'MÁXIMA ORGANIZACIÓN',
    value: '$18.00',
    description: 'La guía definitiva para diseñar, estructurar y armar tus viandas semanales de forma equilibrada, segura y ultra eficiente.',
    bullets: [
      'Esquemas de armado rápido para viandas de oficina o estudio',
      'Técnicas de sellado hermético y distribución de porciones',
      'Lista de combinaciones semanales para evitar la repetición'
    ]
  }
];

export const PLANS: Plan[] = [
  {
    id: 'plan_base',
    name: 'plan_base',
    title: 'Kit Cocina Esencial',
    price: '$3.90',
    originalPrice: '$19.90',
    isPopular: false,
    deliverables: [
      'El libro digital principal: Cocina Inteligente (+100 Recetas)',
      'Guía de Valores Nutricionales',
      'Guía de Herramientas y Envases para Conservar',
      'Acceso de por vida a la plataforma'
    ],
    bonuses: [
      'Bonos no incluidos en este plan'
    ],
    ctaText: 'COMPRAR PLAN BASE →',
    checkoutUrl: 'https://pay.hotmart.com/F106597959A?checkoutMode=10'
  },
  {
    id: 'plan_completo',
    name: 'plan_completo',
    title: 'Sistema Inteligente Premium',
    price: '$5.90',
    originalPrice: '$49.90',
    isPopular: true,
    badge: 'MÁS ELEGIDO',
    deliverables: [
      'El libro digital principal: Cocina Inteligente (+100 Recetas)',
      'Recetas marcadas sin gluten y sin lactosa',
      'Guía de Valores Nutricionales',
      'Guía de Herramientas y Envases para Conservar',
    ],
    bonuses: [
      'Bono 1: Planificador de Menú Semanal Inteligente',
      'Bono 2: Guía de Gestión del Congelador',
      'Bono 3: Plan de Viandas Organizadas'
    ],
    ctaText: 'COMPRAR PLAN COMPLETO →',
    checkoutUrl: 'https://pay.hotmart.com/D106603077D?checkoutMode=10'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Mariana Silva',
    city: 'Santiago de Chile',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'Cocinar se había vuelto mi peor pesadilla al llegar cansada del trabajo. Ahora, dedico 2 horas el domingo y como espectacular toda la semana. ¡El sabor de las recetas congeladas es increíble, parece recién hecho!'
  },
  {
    id: 't2',
    name: 'Andrés López',
    city: 'Bogotá, Colombia',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'He bajado mi gasto mensual en delivery a casi cero. No solo ahorro muchísimo dinero, sino que además como mucho más saludable. La técnica para congelar el arroz y las salsas me cambió la vida.'
  },
  {
    id: 't3',
    name: 'Clara Domínguez',
    city: 'Lima, Perú',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'Lo que más me asustaba era que la comida quedara con sabor a freezer o aguada. Siguiendo los consejos de recipientes y tiempos, la textura queda perfecta. Mis hijos devoran las berenjenas gratinadas.'
  },
  {
    id: 't4',
    name: 'Sofía Valenzuela',
    city: 'Quito, Ecuador',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'Los bonos adicionales valen cada centavo. La guía de gestión del congelador la tengo pegada en la heladera y es mi consulta diaria. El planificador semanal interactivo es facilísimo de usar.'
  },
  {
    id: 't5',
    name: 'Carlos Mendoza',
    city: 'Ciudad de México',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'Como deportista necesito medir bien mis porciones de proteínas y carbohidratos. Con este sistema dejo listos 14 tuppers equilibrados en un solo domingo. Práctico, limpio y delicioso.'
  },
  {
    id: 't6',
    name: 'Gabriela Ponce',
    city: 'Lima, Perú',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'El sistema de porcionado y etiquetado es súper intuitivo. Antes encontraba tuppers misteriosos en el fondo del freezer y los tiraba; ahora tengo un inventario impecable y cero desperdicio.'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq1',
    number: '01',
    question: '¿La comida congelada no pierde sus nutrientes y sabor?',
    answer: 'Al contrario. El congelamiento doméstico rápido bloquea los nutrientes y detiene el deterioro natural. Aplicando nuestras técnicas de enfriamiento rápido y sellado hermético, la comida conserva el 98% de sus vitaminas, textura y sabor original.'
  },
  {
    id: 'faq2',
    number: '02',
    question: '¿Necesito un freezer gigante para aplicar el método?',
    answer: 'No. El sistema incluye una guía especial de porcionado plano en bolsas de silicona reutilizables y apilamiento vertical que maximiza el espacio. Funciona perfectamente en el freezer estándar de cualquier heladera familiar.'
  },
  {
    id: 'faq3',
    number: '03',
    question: '¿Cuánto tiempo dura la comida congelada en perfecto estado?',
    answer: 'La mayoría de nuestras comidas preparadas duran entre 3 y 6 meses. Sin embargo, nuestro sistema está pensado para una rotación de 1 a 4 semanas, garantizando frescura constante en tu mesa.'
  },
  {
    id: 'faq4',
    number: '04',
    question: '¿Qué tipo de contenedores recomiendan usar?',
    answer: 'Recomendamos contenedores de vidrio templado aptos para horno y freezer con tapa hermética de silicona, así como bolsas de silicona de grado alimenticio. En el Capítulo I te enseñamos las marcas recomendadas y cómo usarlos de forma segura sin peligro de quiebre.'
  },
  {
    id: 'faq5',
    number: '05',
    question: '¿Las recetas son fáciles de preparar o requieren ingredientes raros?',
    answer: 'Son recetas 100% realistas con ingredientes sencillos que encuentras en cualquier supermercado o verdulería local. Nos enfocamos en comida real, sabrosa y saludable, libre de ultraprocesados.'
  },
  {
    id: 'faq6',
    number: '06',
    question: '¿Cómo funciona la garantía de 15 días?',
    answer: 'Si por cualquier motivo sientes que el método no se adapta a tu estilo de vida, o las recetas no son de tu agrado, solo tienes que escribirnos un email dentro de los primeros 15 días desde tu compra y te devolveremos el 100% de tu dinero de forma inmediata. Sin preguntas ni vueltas.'
  }
];

export const GALLERY_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&h=400&q=80',
    title: 'Bowl de Pollo y Vegetales Rostizados'
  },
  {
    url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&h=400&q=80',
    title: 'Super Ensalada Mediterránea con Garbanzos'
  },
  {
    url: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=400&h=400&q=80',
    title: 'Salmón Glaseado con Brócoli al Vapor'
  },
  {
    url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=400&h=400&q=80',
    title: 'Tuppers de Meal Prep Semanal'
  },
  {
    url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&h=400&q=80',
    title: 'Verduras Frescas Listas para Porcionar'
  },
  {
    url: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=400&h=400&q=80',
    title: 'Avena con Frutos Rojos en Frasco'
  },
  {
    url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&h=400&q=80',
    title: 'Lasagna de Berenjenas Saludable'
  },
  {
    url: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=400&h=400&q=80',
    title: 'Curry de Garbanzos y Calabaza'
  },
  {
    url: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=400&h=400&q=80',
    title: 'Sopa Cremosa de Tomate Rostizado'
  },
  {
    url: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400&h=400&q=80',
    title: 'Pancakes de Avena y Plátano'
  },
  {
    url: 'https://i.postimg.cc/j2XZkN3P/Banner-Premium-Cook-Zone-Hotmar-Club-(3).webp',
    title: 'Hummus Clásico Casero en Frasco'
  },
  {
    url: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&h=400&q=80',
    title: 'Muffins de Huevo y Espinacas'
  }
];

export const RECIPES: Recipe[] = [
  {
    id: 'r1',
    title: 'Curry de Garbanzos y Espinacas al Coco',
    category: 'Almuerzos',
    prepTime: '15 min',
    freezeTime: 'Hasta 3 meses',
    servings: 4,
    description: 'Un curry reconfortante, cremoso y lleno de proteínas vegetales que congela de maravilla y gana intensidad de sabor con los días.',
    ingredients: [
      '2 latas de garbanzos cocidos (enjuagados y escurridos)',
      '1 lata de leche de coco light',
      '200g de espinacas frescas',
      '1 cebolla picada fina',
      '2 dientes de ajo picados',
      '1 cucharada de jengibre fresco rallado',
      '2 cucharadas de curry en polvo',
      '1 cucharada de aceite de coco',
      'Sal y pimienta al gusto'
    ],
    instructions: [
      'En una olla grande, calienta el aceite de coco a fuego medio. Rehoga la cebolla, el ajo y el jengibre durante 5 minutos hasta que estén tiernos.',
      'Añade el curry en polvo y remueve durante 1 minuto para liberar los aromas.',
      'Agrega los garbanzos y la leche de coco. Mezcla bien y deja que hierva suavemente durante 10 minutos para que espese.',
      'Saca del fuego, añade las espinacas frescas y remueve hasta que se reduzcan con el calor residual. Ajusta de sal y pimienta.',
      'Enfriamiento: Deja enfriar a temperatura ambiente antes de fraccionar en tus contenedores de vidrio herméticos y congelar.'
    ],
    tips: 'A la hora de recalentar, añade un chorrito de agua o leche vegetal para recuperar la cremosidad original de la salsa.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=400&q=80',
    isGlutenFree: true,
    isLactoseFree: true
  },
  {
    id: 'r2',
    title: 'Lasagna de Calabacín y Ricota sin Harinas',
    category: 'Cenas',
    prepTime: '25 min',
    freezeTime: 'Hasta 2 meses',
    servings: 3,
    description: 'Capas de calabacín tierno, ricota ligera con hierbas y salsa boloñesa casera de pavo. Baja en carbohidratos y súper saciante.',
    ingredients: [
      '2 calabacines grandes cortados en láminas finas a lo largo',
      '300g de carne picada de pavo o pollo',
      '400g de salsa de tomate casera triturada',
      '250g de queso ricota o requesón bajo en grasa',
      '1 huevo',
      '100g de queso mozzarella rallado para gratinar',
      '1 cucharadita de orégano seco',
      'Sal, pimienta y ajo en polvo'
    ],
    instructions: [
      'Pasa las láminas de calabacín por una plancha caliente durante 1 minuto por lado para quitar el exceso de humedad. Seca con papel de cocina.',
      'Cocina la carne picada en una sartén con sal, pimienta y la salsa de tomate durante 12 minutos.',
      'En un bol, mezcla la ricota, el huevo, el orégano, sal y pimienta hasta formar una crema homogénea.',
      'En moldes individuales aptos para horno y congelado, monta capas: salsa de carne, láminas de calabacín, crema de ricota, repitiendo hasta el borde.',
      'Corona con mozzarella rallada.',
      'Para congelar: Tapa herméticamente SIN hornear y guarda. El día de consumo, hornea directamente a 180°C durante 35 minutos.'
    ],
    tips: 'Secar muy bien el calabacín a la plancha es el secreto crucial para evitar que la lasagna suelte agua al descongelar.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80',
    isGlutenFree: true,
    isLactoseFree: false
  },
  {
    id: 'r3',
    title: 'Muffins de Huevo, Champiñones y Pimientos',
    category: 'Desayunos',
    prepTime: '10 min',
    freezeTime: 'Hasta 1 mes',
    servings: 6,
    description: 'Ideales para desayunos express de lunes a viernes. Descongélalos en solo 45 segundos en el microondas y disfruta un desayuno proteico.',
    ingredients: [
      '6 huevos grandes batidos',
      '100g de champiñones laminados finos',
      '1/2 pimiento rojo cortado en cubitos pequeños',
      '50g de hojas de espinaca picadas',
      '30g de queso de cabra desmenuzado (opcional)',
      'Sal, pimienta y una pizca de pimentón dulce'
    ],
    instructions: [
      'Precalienta el horno a 180°C y engrasa un molde para muffins de silicona.',
      'Reparte los champiñones, pimientos y espinacas en los huecos del molde de forma uniforme.',
      'Bate los huevos con sal, pimienta y pimentón. Vierte el huevo batido en cada molde, llenando hasta 3/4 partes.',
      'Espolvorea un poco de queso de cabra por encima.',
      'Hornea durante 15-18 minutos hasta que los muffins estén inflados y dorados en los bordes.',
      'Deja enfriar por completo, desmolda y colócalos en una bolsa hermética apta para freezer.'
    ],
    tips: 'Para consumir, envuelve un muffin congelado en una servilleta de papel y calienta en el microondas durante 40-50 segundos a potencia máxima.',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&q=80',
    isGlutenFree: true,
    isLactoseFree: true
  },
  {
    id: 'r4',
    title: 'Salsa Pesto Cremoso de Aguacate y Albahaca',
    category: 'Salsas',
    prepTime: '5 min',
    freezeTime: 'Hasta 1 mes',
    servings: 6,
    description: 'Una salsa súper cremosa rica en grasas saludables. Al congelarla en moldes para cubitos de hielo, puedes sacar la porción exacta que necesites.',
    ingredients: [
      '1 aguacate maduro grande',
      '2 tazas de hojas de albahaca fresca prensada',
      '2 dientes de ajo',
      '50g de nueces o almendras tostadas',
      '4 cucharadas de aceite de oliva virgen extra',
      '2 cucharadas de jugo de limón fresco (evita la oxidación)',
      'Sal y pimienta negra'
    ],
    instructions: [
      'Introduce todos los ingredientes en el vaso de una licuadora o procesador de alimentos.',
      'Tritura a potencia máxima hasta obtener una crema espesa, sedosa y de color verde vibrante.',
      'Prueba y rectifica el punto de sal y limón si es necesario.',
      'Vierte el pesto en una bandeja de cubitos de hielo de silicona y congela durante 4 horas.',
      'Desmolda los cubitos congelados y guárdalos juntos en una bolsa con cierre hermético en el freezer.'
    ],
    tips: 'El jugo de limón es clave para evitar que el aguacate se oxide y se vuelva marrón al descongelar. Un cubito de este pesto sobre pasta caliente se derrite al instante creando una salsa divina.',
    image: 'https://images.unsplash.com/photo-1496116211227-2d83764831f2?auto=format&fit=crop&w=400&q=80',
    isGlutenFree: true,
    isLactoseFree: true
  },
  {
    id: 'r5',
    title: 'Arroz de Brócoli con Pavo y Almendras',
    category: 'Almuerzos',
    prepTime: '15 min',
    freezeTime: 'Hasta 2 meses',
    servings: 3,
    description: 'Una alternativa liviana y nutritiva al arroz tradicional. Congela perfectamente y se saltea en 3 minutos directo del freezer.',
    ingredients: [
      '2 cabezas de brócoli grandes (procesadas en textura de arroz)',
      '300g de pechuga de pavo picada',
      '1 zanahoria cortada en cubitos mínimos',
      '30g de almendras laminadas',
      '2 cucharadas de salsa de soja baja en sodio',
      '1 cucharada de aceite de sésamo',
      '1 diente de ajo rallado'
    ],
    instructions: [
      'En un wok o sartén grande, calienta el aceite de sésamo y saltea el ajo y la pechuga de pavo hasta que esté dorada.',
      'Añade los cubitos de zanahoria y saltea 3 minutos más.',
      'Agrega el arroz de brócoli crudo y saltea rápidamente durante 4 minutos a fuego fuerte (queremos que quede al dente, no blando).',
      'Vierte la salsa de soja y mezcla bien. Saca del fuego y espolvorea las almendras laminadas por encima.',
      'Deja enfriar por completo antes de envasar herméticamente.'
    ],
    tips: 'Al recalentar, hazlo en una sartén muy caliente sin añadir aceite extra. Quedará crujiente y aromático.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80',
    isGlutenFree: false,
    isLactoseFree: true
  }
];
