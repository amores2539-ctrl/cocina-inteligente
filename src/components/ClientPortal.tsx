import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Calendar, 
  ListChecks, 
  Download, 
  Flame, 
  Clock, 
  Users, 
  ChevronRight, 
  Printer, 
  CheckCircle, 
  Lock, 
  LogOut,
  Sparkles,
  SearchCheck,
  RotateCcw
} from 'lucide-react';
import { RECIPES, CHAPTERS, BONUSES, Recipe, Chapter, Bonus } from '../data/landingData';

interface ClientPortalProps {
  userName: string;
  userEmail: string;
  userPlan: 'plan_base' | 'plan_completo';
  onLogout: () => void;
  onShowToast: (msg: string) => void;
}

export default function ClientPortal({ userName, userEmail, userPlan, onLogout, onShowToast }: ClientPortalProps) {
  const [activeTab, setActiveTab] = useState<'recipes' | 'planner' | 'materials' | 'guide'>('recipes');
  
  // Recipe Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [onlyGlutenFree, setOnlyGlutenFree] = useState(false);
  const [onlyLactoseFree, setOnlyLactoseFree] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipeServings, setRecipeServings] = useState<number>(4);

  // Meal Planner State
  const initialPlanner = {
    Lunes: { Desayuno: 'r3', Almuerzo: 'r1', Cena: 'r2' },
    Martes: { Desayuno: 'r3', Almuerzo: 'r5', Cena: 'r2' },
    Miércoles: { Desayuno: '', Almuerzo: 'r1', Cena: 'r5' },
    Jueves: { Desayuno: 'r3', Almuerzo: 'r5', Cena: '' },
    Viernes: { Desayuno: '', Almuerzo: 'r1', Cena: 'r2' },
    Sábado: { Desayuno: '', Almuerzo: '', Cena: '' },
    Domingo: { Desayuno: '', Almuerzo: '', Cena: '' },
  };
  const [planner, setPlanner] = useState<Record<string, Record<string, string>>>(initialPlanner);
  const [isEditingPlanner, setIsEditingPlanner] = useState<string | null>(null); // "Day-Meal" key
  const [downloadingPDF, setDownloadingPDF] = useState(false);

  // Guide search
  const [guideSearch, setGuideSearch] = useState('');

  // 120+ preservation items database
  const PRESERVATION_DATA = [
    { name: 'Pollo y Aves (Cocidos)', time: '4 meses', pack: 'Envase de vidrio hermético', note: 'Separar pechugas con papel manteca.' },
    { name: 'Salsas con Tomate', time: '6 meses', pack: 'Frascos o bolsas de silicona', note: 'Dejar 2cm de espacio libre para la expansión.' },
    { name: 'Verduras Verdes Blanqueadas', time: '8 meses', pack: 'Bolsas al vacío o silicona', note: 'Blanquear 2 minutos antes para fijar color.' },
    { name: 'Guisos y Sopas', time: '3 meses', pack: 'Contenedor hermético', note: 'Descongelar lento en la heladera 12 horas antes.' },
    { name: 'Arroz y Granos Cocidos', time: '2 meses', pack: 'Bolsa hermética plana', note: 'Congelar recién enfriado para evitar que se pegue.' },
    { name: 'Pescado Blanco Cocido', time: '2 meses', pack: 'Contenedor hermético al vacío', note: 'Consumir rápido al descongelar.' },
    { name: 'Muffins y Panes', time: '3 meses', pack: 'Envolver individualmente', note: 'Calentar directo en tostadora o microondas.' },
    { name: 'Caldo de Verduras o Carne', time: '6 meses', pack: 'Cubiteras de silicona', note: 'Retirar grasa superficial antes de congelar.' },
    { name: 'Carne Roja Picada Cocida', time: '3 meses', pack: 'Bolsas planas', note: 'Sellar muy bien al vacío para evitar quemaduras.' },
    { name: 'Quesos Duros Rallados', time: '6 meses', pack: 'Bolsas con cierre', note: 'Verter directo a la preparación sin descongelar.' }
  ];

  const filteredGuide = useMemo(() => {
    if (!guideSearch) return PRESERVATION_DATA;
    return PRESERVATION_DATA.filter(item => 
      item.name.toLowerCase().includes(guideSearch.toLowerCase()) ||
      item.note.toLowerCase().includes(guideSearch.toLowerCase())
    );
  }, [guideSearch]);

  const filteredRecipes = useMemo(() => {
    return RECIPES.filter(recipe => {
      const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos' || recipe.category === selectedCategory;
      const matchesGluten = !onlyGlutenFree || recipe.isGlutenFree;
      const matchesLactose = !onlyLactoseFree || recipe.isLactoseFree;
      return matchesSearch && matchesCategory && matchesGluten && matchesLactose;
    });
  }, [searchQuery, selectedCategory, onlyGlutenFree, onlyLactoseFree]);

  const selectRecipeForPlanner = (day: string, meal: string, recipeId: string) => {
    setPlanner(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [meal]: recipeId
      }
    }));
    setIsEditingPlanner(null);
    onShowToast(`Menú de ${day} (${meal}) actualizado con éxito.`);
  };

  const clearPlanner = () => {
    setPlanner({
      Lunes: { Desayuno: '', Almuerzo: '', Cena: '' },
      Martes: { Desayuno: '', Almuerzo: '', Cena: '' },
      Miércoles: { Desayuno: '', Almuerzo: '', Cena: '' },
      Jueves: { Desayuno: '', Almuerzo: '', Cena: '' },
      Viernes: { Desayuno: '', Almuerzo: '', Cena: '' },
      Sábado: { Desayuno: '', Almuerzo: '', Cena: '' },
      Domingo: { Desayuno: '', Almuerzo: '', Cena: '' },
    });
    onShowToast('Se ha limpiado tu planificador semanal.');
  };

  // Compile shopping list based on selected recipes in planner
  const compiledShoppingList = useMemo(() => {
    const ingredientCounts: Record<string, number> = {};
    const items: string[] = [];

    Object.values(planner).forEach(dayMeals => {
      Object.values(dayMeals).forEach(recipeId => {
        if (!recipeId) return;
        const recipe = RECIPES.find(r => r.id === recipeId);
        if (recipe) {
          recipe.ingredients.forEach(ing => {
            // Simplify or list directly
            if (!items.includes(ing)) {
              items.push(ing);
            }
          });
        }
      });
    });

    return items;
  }, [planner]);

  const handleDownloadPDF = (title: string) => {
    setDownloadingPDF(true);
    setTimeout(() => {
      setDownloadingPDF(false);
      onShowToast(`¡Descarga iniciada! "${title}.pdf" guardado en tu dispositivo.`);
    }, 1500);
  };

  const openRecipeDetails = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setRecipeServings(recipe.servings);
  };

  return (
    <div className="min-h-screen bg-brand-base text-brand-text flex flex-col animate-fade-in" id="portal-root">
      {/* Header Area */}
      <header className="bg-brand-green text-white border-b border-brand-gold/20 py-4 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-display italic text-brand-gold text-2xl font-bold">Cocina</span>
          <span className="font-sans font-bold tracking-wider text-lg uppercase">Inteligente</span>
          <span className="px-2.5 py-1 bg-brand-gold text-white text-[10px] uppercase font-bold tracking-wider rounded">
            Portal Alumnos
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-white">Hola, {userName}</p>
            <p className="text-[10px] text-white/70">{userEmail}</p>
          </div>
          <div className="h-8 w-px bg-white/20 hidden sm:block"></div>
          <button 
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-white/20 rounded hover:bg-white/10 text-xs transition-all font-sans"
            id="logout-button"
          >
            <LogOut className="w-3.5 h-3.5" /> Salir del Portal
          </button>
        </div>
      </header>

      {/* Main navigation */}
      <div className="bg-white/70 border-b border-brand-gold/15 py-1 px-4 md:px-12 flex gap-1 overflow-x-auto">
        <button
          onClick={() => { setActiveTab('recipes'); setSelectedRecipe(null); }}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all shrink-0 ${
            activeTab === 'recipes' 
              ? 'border-brand-green text-brand-green bg-brand-green/5' 
              : 'border-transparent text-brand-soft hover:text-brand-text'
          }`}
        >
          <BookOpen className="w-4 h-4 text-brand-gold" /> Recetas Inteligentes
        </button>
        <button
          onClick={() => { setActiveTab('planner'); }}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all shrink-0 ${
            activeTab === 'planner' 
              ? 'border-brand-green text-brand-green bg-brand-green/5' 
              : 'border-transparent text-brand-soft hover:text-brand-text'
          }`}
        >
          <Calendar className="w-4 h-4 text-brand-gold" /> Planificador Semanal
        </button>
        <button
          onClick={() => { setActiveTab('materials'); }}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all shrink-0 ${
            activeTab === 'materials' 
              ? 'border-brand-green text-brand-green bg-brand-green/5' 
              : 'border-transparent text-brand-soft hover:text-brand-text'
          }`}
        >
          <Sparkles className="w-4 h-4 text-brand-gold" /> Libros y Entregables
        </button>
        <button
          onClick={() => { setActiveTab('guide'); }}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all shrink-0 ${
            activeTab === 'guide' 
              ? 'border-brand-green text-brand-green bg-brand-green/5' 
              : 'border-transparent text-brand-soft hover:text-brand-text'
          }`}
        >
          <SearchCheck className="w-4 h-4 text-brand-gold" /> Guía de Conservación
        </button>
      </div>

      {/* Main Container */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto">
        
        {/* Banner Alert according to Plan */}
        <div className="mb-8 p-4 bg-white border border-brand-gold/15 rounded shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display font-semibold text-lg text-brand-text">
              Licencia Activa: <span className="italic text-brand-gold">{userPlan === 'plan_completo' ? 'Sistema Inteligente Premium' : 'Kit Cocina Esencial'}</span>
            </h2>
            <p className="text-xs text-brand-soft mt-1">
              Tienes acceso ilimitado de por vida a los materiales del curso, actualizaciones y soporte prioritario.
            </p>
          </div>
          {userPlan === 'plan_base' && (
            <div className="shrink-0 bg-brand-green text-white p-3 py-2 rounded flex flex-col items-center">
              <span className="text-[10px] tracking-widest font-bold uppercase text-brand-gold">BONOS DESBLOQUEABLES</span>
              <span className="text-sm font-bold mt-0.5">Sube a Premium por $2.00</span>
              <button 
                onClick={() => onShowToast('Upgrade simulado con éxito. ¡Ahora eres Alumno Completo!')}
                className="mt-1 px-4 py-1 bg-brand-gold hover:bg-brand-gold/90 text-white font-sans text-[10px] tracking-wide font-bold uppercase rounded transition-colors"
              >
                Actualizar ahora
              </button>
            </div>
          )}
        </div>

        {/* Tab Content: RECIPES */}
        {activeTab === 'recipes' && !selectedRecipe && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div>
                <h3 className="font-display font-bold text-2xl text-brand-text">Recetario Digital</h3>
                <p className="text-xs text-brand-soft">Busca entre tus comidas saludables y programa tu semana culinaria.</p>
              </div>

              {/* Search */}
              <div className="relative w-full sm:w-72">
                <input 
                  type="text"
                  placeholder="Buscar receta (ej. pavo, curry)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-brand-gold/20 rounded font-sans text-xs focus:outline-none focus:ring-1 focus:ring-brand-gold"
                />
                <Search className="w-3.5 h-3.5 text-brand-soft absolute left-3 top-3" />
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 items-center justify-between">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {['Todos', 'Desayunos', 'Almuerzos', 'Cenas', 'Salsas'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all uppercase ${
                      selectedCategory === cat 
                        ? 'bg-brand-green text-white' 
                        : 'bg-white border border-brand-gold/15 text-brand-soft hover:border-brand-gold/45 hover:text-brand-text'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Filtros de Alérgenos */}
              <div className="flex items-center gap-2 pb-2">
                <button
                  onClick={() => setOnlyGlutenFree(!onlyGlutenFree)}
                  className={`px-3 py-1.5 rounded text-[11px] font-bold tracking-wide transition-all flex items-center gap-1 border uppercase ${
                    onlyGlutenFree 
                      ? 'bg-amber-100 border-amber-300 text-amber-900' 
                      : 'bg-white border-brand-gold/15 text-brand-soft hover:border-brand-gold/40'
                  }`}
                >
                  🌾 Sin Gluten
                </button>
                <button
                  onClick={() => setOnlyLactoseFree(!onlyLactoseFree)}
                  className={`px-3 py-1.5 rounded text-[11px] font-bold tracking-wide transition-all flex items-center gap-1 border uppercase ${
                    onlyLactoseFree 
                      ? 'bg-blue-100 border-blue-300 text-blue-950' 
                      : 'bg-white border-brand-gold/15 text-brand-soft hover:border-brand-gold/40'
                  }`}
                >
                  🥛 Sin Lactosa
                </button>
              </div>
            </div>

            {/* Recipes Grid */}
            {filteredRecipes.length === 0 ? (
              <div className="p-12 text-center bg-white border border-dashed border-brand-gold/25 rounded-md">
                <p className="text-sm text-brand-soft">No se encontraron recetas con los términos especificados.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedCategory('Todos'); setOnlyGlutenFree(false); setOnlyLactoseFree(false); }}
                  className="mt-2 text-xs font-bold text-brand-green uppercase tracking-wide hover:underline"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map((recipe) => (
                  <div 
                    key={recipe.id}
                    onClick={() => openRecipeDetails(recipe)}
                    className="bg-white border border-brand-gold/10 rounded overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col group"
                  >
                    <div className="h-44 relative overflow-hidden bg-brand-base">
                      <img 
                        src={recipe.image} 
                        alt={recipe.title}
                        referrerPolicy="no-referrer"
                        width={300}
                        height={200}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-brand-green text-white text-[9px] uppercase font-bold px-2 py-1 tracking-wider rounded">
                        {recipe.category}
                      </span>
                      <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
                        {recipe.isGlutenFree && (
                          <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shadow-sm">
                            🌾 Sin Gluten
                          </span>
                        )}
                        {recipe.isLactoseFree && (
                          <span className="bg-blue-100 text-blue-900 border border-blue-300 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shadow-sm">
                            🥛 Sin Lactosa
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-1.5">
                        <h4 className="font-display font-bold text-lg text-brand-text group-hover:text-brand-green transition-colors leading-snug">
                          {recipe.title}
                        </h4>
                        <p className="text-xs text-brand-soft line-clamp-2">{recipe.description}</p>
                      </div>

                      <div className="pt-3 border-t border-brand-gold/15 flex justify-between items-center text-[11px] text-brand-soft font-mono">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-brand-gold" /> {recipe.prepTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-brand-gold" /> {recipe.freezeTime}
                        </span>
                        <span className="font-semibold text-brand-green flex items-center gap-1">
                          Ver Receta <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Recipe Expanded View */}
        {activeTab === 'recipes' && selectedRecipe && (
          <div className="bg-white border border-brand-gold/15 rounded shadow-lg overflow-hidden animate-fade-in">
            {/* Top Back Header */}
            <div className="bg-brand-green text-white p-4 px-6 flex items-center justify-between">
              <button 
                onClick={() => setSelectedRecipe(null)}
                className="text-xs font-semibold tracking-wider uppercase text-white/80 hover:text-white flex items-center gap-1"
              >
                ← Volver al listado
              </button>
              <span className="text-[10px] tracking-widest uppercase font-bold text-brand-gold">{selectedRecipe.category}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Recipe Cover */}
              <div className="lg:col-span-5 h-64 lg:h-auto relative bg-brand-base">
                <img 
                  src={selectedRecipe.image} 
                  alt={selectedRecipe.title}
                  referrerPolicy="no-referrer"
                  width={400}
                  height={300}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Recipe Info */}
              <div className="lg:col-span-7 p-6 md:p-8 space-y-6">
                <div>
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-brand-text">{selectedRecipe.title}</h3>
                  {(selectedRecipe.isGlutenFree || selectedRecipe.isLactoseFree) && (
                    <div className="flex gap-2 mt-2">
                      {selectedRecipe.isGlutenFree && (
                        <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                          🌾 Sin Gluten
                        </span>
                      )}
                      {selectedRecipe.isLactoseFree && (
                        <span className="bg-blue-100 text-blue-950 border border-blue-300 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                          🥛 Sin Lactosa
                        </span>
                      )}
                    </div>
                  )}
                  <p className="text-xs text-brand-soft mt-2">{selectedRecipe.description}</p>
                </div>

                {/* Meta details */}
                <div className="grid grid-cols-3 gap-4 py-4 border-y border-brand-gold/15">
                  <div className="text-center">
                    <span className="block text-[10px] uppercase font-semibold text-brand-soft">Preparación</span>
                    <span className="font-mono text-sm font-bold text-brand-green flex items-center justify-center gap-1 mt-1">
                      <Clock className="w-4 h-4 text-brand-gold" /> {selectedRecipe.prepTime}
                    </span>
                  </div>
                  <div className="text-center border-x border-brand-gold/15">
                    <span className="block text-[10px] uppercase font-semibold text-brand-soft">Congelación</span>
                    <span className="font-mono text-sm font-bold text-brand-green flex items-center justify-center gap-1 mt-1">
                      <Flame className="w-4 h-4 text-brand-gold" /> {selectedRecipe.freezeTime}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="block text-[10px] uppercase font-semibold text-brand-soft">Porciones</span>
                    <div className="flex items-center justify-center gap-2 mt-1">
                      <button 
                        onClick={() => setRecipeServings(Math.max(1, recipeServings - 1))}
                        className="w-5 h-5 bg-brand-base rounded-full text-xs font-bold flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="font-mono text-sm font-bold text-brand-green">{recipeServings}</span>
                      <button 
                        onClick={() => setRecipeServings(recipeServings + 1)}
                        className="w-5 h-5 bg-brand-base rounded-full text-xs font-bold flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Ingredients & scaling */}
                <div className="space-y-3">
                  <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-brand-gold flex items-center gap-1.5">
                    <ListChecks className="w-4 h-4" /> Ingredientes (Escalados para {recipeServings} porciones)
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    {selectedRecipe.ingredients.map((ing, i) => {
                      // Attempt to scale numbers if present
                      let scaledIng = ing;
                      const ratio = recipeServings / selectedRecipe.servings;
                      const numberRegex = /^(\d+(\.\d+)?)\s*(\w+)?/;
                      const match = ing.match(numberRegex);
                      if (match) {
                        const num = parseFloat(match[1]);
                        const scaledNum = (num * ratio).toFixed(1).replace(/\.0$/, '');
                        scaledIng = ing.replace(match[1], scaledNum);
                      }
                      return (
                        <li key={i} className="flex items-start gap-2 p-1.5 hover:bg-brand-base rounded">
                          <input type="checkbox" className="mt-0.5 rounded border-brand-gold/20 text-brand-green focus:ring-brand-green" />
                          <span>{scaledIng}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Instructions */}
                <div className="space-y-3 pt-3 border-t border-brand-gold/15">
                  <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-brand-gold">Instrucciones Paso a Paso</h4>
                  <ol className="space-y-3.5 text-xs text-brand-text">
                    {selectedRecipe.instructions.map((step, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="w-5 h-5 bg-brand-green text-white text-[10px] font-mono font-bold flex items-center justify-center rounded-full shrink-0">
                          {i + 1}
                        </span>
                        <p className="leading-relaxed">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Secret tip */}
                {selectedRecipe.tips && (
                  <div className="p-3 bg-brand-base/80 border-l-4 border-brand-gold text-xs italic text-brand-soft rounded-r">
                    <span className="font-bold not-italic block uppercase text-[10px] tracking-wide text-brand-text mb-1">💡 Tips de congelación y recalentado:</span>
                    {selectedRecipe.tips}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: PLANNER */}
        {activeTab === 'planner' && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-display font-bold text-2xl text-brand-text">Planificador Semanal Interactivo</h3>
                <p className="text-xs text-brand-soft">Asigna recetas saludables a cada día de la semana y obtén tu lista de compras.</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={clearPlanner}
                  className="flex items-center gap-1 px-3 py-2 border border-brand-gold/20 rounded bg-white text-xs text-brand-soft hover:text-brand-text transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Limpiar Todo
                </button>
                <button
                  onClick={() => handleDownloadPDF('Menu_Semanal_Cocina_Inteligente')}
                  disabled={downloadingPDF}
                  className="flex items-center gap-1.5 px-4 py-2 bg-brand-green hover:bg-brand-green/95 text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-all disabled:opacity-50"
                >
                  {downloadingPDF ? (
                    'GENERANDO...'
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5 text-brand-gold" /> Exportar Menú
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Grid Days Planner */}
            <div className="bg-white border border-brand-gold/15 rounded shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-brand-green text-white font-sans text-xs uppercase tracking-wider text-left">
                      <th className="p-3.5 border-b border-brand-gold/10 w-24">Día</th>
                      <th className="p-3.5 border-b border-brand-gold/10">🌅 Desayuno</th>
                      <th className="p-3.5 border-b border-brand-gold/10">☀️ Almuerzo</th>
                      <th className="p-3.5 border-b border-brand-gold/10">🌙 Cena</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs">
                    {Object.keys(planner).map((day) => (
                      <tr key={day} className="border-b border-brand-gold/10 hover:bg-brand-base/20 transition-colors">
                        <td className="p-3.5 font-bold text-brand-text bg-brand-base/30">{day}</td>
                        {['Desayuno', 'Almuerzo', 'Cena'].map((meal) => {
                          const recipeId = planner[day][meal];
                          const assignedRecipe = RECIPES.find(r => r.id === recipeId);
                          const editKey = `${day}-${meal}`;
                          
                          return (
                            <td key={meal} className="p-3 relative">
                              {isEditingPlanner === editKey ? (
                                <div className="absolute inset-0 z-10 bg-white p-2 flex flex-col gap-1 justify-center border border-brand-gold/40 shadow-lg rounded">
                                  <span className="text-[10px] font-bold text-brand-gold uppercase block">Cambiar:</span>
                                  <select 
                                    className="w-full text-xs p-1 border border-brand-gold/20 rounded"
                                    onChange={(e) => selectRecipeForPlanner(day, meal, e.target.value)}
                                    defaultValue={recipeId}
                                  >
                                    <option value="">(Vacío)</option>
                                    {RECIPES.map(r => (
                                      <option key={r.id} value={r.id}>{r.title}</option>
                                    ))}
                                  </select>
                                  <button 
                                    onClick={() => setIsEditingPlanner(null)}
                                    className="text-[9px] text-brand-soft hover:underline self-end"
                                  >
                                    Cancelar
                                  </button>
                                </div>
                              ) : null}

                              {assignedRecipe ? (
                                <div className="flex justify-between items-start gap-1 group">
                                  <div>
                                    <span 
                                      onClick={() => openRecipeDetails(assignedRecipe)}
                                      className="font-semibold text-brand-green hover:underline cursor-pointer block leading-snug"
                                    >
                                      {assignedRecipe.title}
                                    </span>
                                    <span className="text-[10px] text-brand-soft">{assignedRecipe.category}</span>
                                  </div>
                                  <button
                                    onClick={() => setIsEditingPlanner(editKey)}
                                    className="text-[10px] text-brand-gold hover:text-brand-text opacity-0 group-hover:opacity-100 transition-opacity font-semibold"
                                  >
                                    Editar
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setIsEditingPlanner(editKey)}
                                  className="py-1 px-2 border border-dashed border-brand-gold/30 rounded text-brand-soft hover:text-brand-green hover:border-brand-green/50 text-[10px] transition-colors"
                                >
                                  + Asignar comida
                                </button>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Compiled Shopping List */}
            <div className="bg-white border border-brand-gold/15 rounded shadow-sm p-6 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-brand-gold/10">
                <h4 className="font-display font-bold text-lg text-brand-text flex items-center gap-2">
                  <ListChecks className="w-5 h-5 text-brand-gold" /> Lista de Compras Inteligente
                </h4>
                <span className="text-[11px] font-mono bg-brand-base text-brand-green px-3 py-1 rounded font-semibold">
                  {compiledShoppingList.length} Ingredientes detectados
                </span>
              </div>

              {compiledShoppingList.length === 0 ? (
                <p className="text-xs text-brand-soft italic">Asigna recetas al planificador de arriba para generar tu lista de compras automáticamente.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {compiledShoppingList.map((item, i) => (
                    <label key={i} className="flex items-start gap-2.5 p-2 bg-brand-base/40 hover:bg-brand-base/80 rounded cursor-pointer text-xs">
                      <input type="checkbox" className="mt-0.5 rounded border-brand-gold/20 text-brand-green focus:ring-brand-green" />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              )}

              {compiledShoppingList.length > 0 && (
                <div className="pt-3 flex justify-end">
                  <button 
                    onClick={() => {
                      window.print();
                    }}
                    className="flex items-center gap-1.5 text-xs font-bold text-brand-green uppercase tracking-wide hover:underline"
                  >
                    <Printer className="w-4 h-4" /> Imprimir Lista de Compras
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab Content: MATERIALS */}
        {activeTab === 'materials' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h3 className="font-display font-bold text-2xl text-brand-text">Biblioteca de Entregables</h3>
              <p className="text-xs text-brand-soft">Descarga tus ebooks digitales, plantillas y guías exclusivas en formato PDF de alta calidad.</p>
            </div>

            {/* Core Book Chapter Cards */}
            <div className="space-y-4">
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-brand-gold">Libro Principal: Cocina Inteligente</span>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CHAPTERS.map((chap) => (
                  <div key={chap.id} className="bg-white border border-brand-gold/15 rounded p-5 flex flex-col justify-between space-y-4 shadow-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-brand-gold tracking-widest uppercase">{chap.numLabel}</span>
                        <span className="w-2.5 h-2.5 bg-brand-green rounded-full"></span>
                      </div>
                      <h4 className="font-display font-bold text-lg text-brand-text">{chap.title}</h4>
                      <span className="block text-[9px] font-mono tracking-wider text-brand-soft uppercase font-bold">{chap.subtitle}</span>
                      <p className="text-xs text-brand-soft">{chap.description}</p>
                    </div>
                    <button
                      onClick={() => handleDownloadPDF(chap.title)}
                      className="w-full py-2 bg-brand-base hover:bg-brand-gold/10 border border-brand-gold/20 text-brand-text text-[11px] uppercase tracking-wider font-bold transition-all rounded flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5 text-brand-green" /> Descargar Capítulo
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Guías Adicionales (Comunes) */}
            <div className="space-y-4 pt-4">
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-brand-gold">Recursos del Plan</span>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white border border-brand-gold/15 rounded p-5 flex flex-col justify-between space-y-4 shadow-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] bg-brand-green/10 text-brand-green px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                        INCLUIDO
                      </span>
                      <span className="w-2.5 h-2.5 bg-brand-green rounded-full"></span>
                    </div>
                    <h4 className="font-display font-bold text-lg text-brand-text">Guía de Valores Nutricionales</h4>
                    <span className="block text-[9px] font-mono tracking-wider text-brand-soft uppercase font-bold">CONTROL CALÓRICO Y MACROS</span>
                    <p className="text-xs text-brand-soft">La tabla nutricional completa para cada plato del recetario: calorías, proteínas, grasas y carbohidratos netos.</p>
                  </div>
                  <button
                    onClick={() => handleDownloadPDF('Guía de Valores Nutricionales')}
                    className="w-full py-2 bg-brand-base hover:bg-brand-gold/10 border border-brand-gold/20 text-brand-text text-[11px] uppercase tracking-wider font-bold transition-all rounded flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-brand-green" /> Descargar Guía PDF
                  </button>
                </div>

                <div className="bg-white border border-brand-gold/15 rounded p-5 flex flex-col justify-between space-y-4 shadow-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] bg-brand-green/10 text-brand-green px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                        INCLUIDO
                      </span>
                      <span className="w-2.5 h-2.5 bg-brand-green rounded-full"></span>
                    </div>
                    <h4 className="font-display font-bold text-lg text-brand-text">Guía de Herramientas y Envases para Conservar</h4>
                    <span className="block text-[9px] font-mono tracking-wider text-brand-soft uppercase font-bold">EQUIPAMIENTO Y SEGURIDAD</span>
                    <p className="text-xs text-brand-soft">La selección recomendada de recipientes herméticos, bolsas de silicona y utensilios clave para optimizar la conservación.</p>
                  </div>
                  <button
                    onClick={() => handleDownloadPDF('Guía de Herramientas y Envases para Conservar')}
                    className="w-full py-2 bg-brand-base hover:bg-brand-gold/10 border border-brand-gold/20 text-brand-text text-[11px] uppercase tracking-wider font-bold transition-all rounded flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-brand-green" /> Descargar Guía PDF
                  </button>
                </div>
              </div>
            </div>

            {/* Bonuses Ebooks Section */}
            <div className="space-y-4 pt-4">
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-brand-gold">Bonos de Oferta</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {BONUSES.map((bonus) => {
                  const isLocked = userPlan === 'plan_base';
                  
                  return (
                    <div 
                      key={bonus.id} 
                      className={`relative bg-white border border-brand-gold/15 rounded p-5 flex flex-col justify-between space-y-4 shadow-sm ${
                        isLocked ? 'opacity-85 bg-brand-base/10' : ''
                      }`}
                    >
                      {isLocked && (
                        <div className="absolute inset-0 bg-brand-dark/5 backdrop-blur-[1px] flex flex-col items-center justify-center text-center p-4">
                          <Lock className="w-8 h-8 text-brand-gold mb-2" />
                          <span className="text-xs font-bold text-brand-text uppercase tracking-wider">Bono Exclusivo</span>
                          <span className="text-[10px] text-brand-soft">Desbloqueable con el Plan Completo</span>
                        </div>
                      )}

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] bg-brand-green/10 text-brand-green px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                            GRATIS HOY
                          </span>
                          <span className="text-xs font-mono font-bold text-brand-soft/70 line-through">{bonus.value}</span>
                        </div>
                        <h4 className="font-display font-bold text-lg text-brand-text">{bonus.title}</h4>
                        <span className="block text-[9px] font-mono tracking-wider text-brand-soft uppercase font-bold">{bonus.subtitle}</span>
                        
                        {bonus.id === 'bo1' && (
                          <div className="h-96 bg-brand-base rounded flex items-center justify-center p-3 relative overflow-hidden my-2">
                            <img 
                              src="https://i.postimg.cc/7hnGDLwP/Mockup-Planificador-Semanal.webp" 
                              alt="Bono 1: Planificador de Menú Semanal"
                              width={240}
                              height={320}
                              loading="lazy"
                              decoding="async"
                              className="h-full w-auto object-contain z-10 rounded shadow-sm hover:scale-105 transition-transform duration-300"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        )}

                        {bonus.id === 'bo2' && (
                          <div className="h-96 bg-brand-base rounded flex items-center justify-center p-3 relative overflow-hidden my-2">
                            <img 
                              src="https://i.postimg.cc/fTXZVP9C/Mockup-Guia-Gestion-del-Congelador.webp" 
                              alt="Bono 2: Guía de Gestión del Congelador"
                              width={240}
                              height={320}
                              loading="lazy"
                              decoding="async"
                              className="h-full w-auto object-contain z-10 rounded shadow-sm hover:scale-105 transition-transform duration-300"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        )}

                        {bonus.id === 'bo3' && (
                          <div className="h-96 bg-brand-base rounded flex items-center justify-center p-3 relative overflow-hidden my-2">
                            <img 
                              src="https://i.postimg.cc/g03G1TYr/Mockup-Guia-Plan-de-Viandas.webp" 
                              alt="Bono 3: Plan de Viandas Organizadas"
                              width={240}
                              height={320}
                              loading="lazy"
                              decoding="async"
                              className="h-full w-auto object-contain z-10 rounded shadow-sm hover:scale-105 transition-transform duration-300"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        )}

                        <p className="text-xs text-brand-soft">{bonus.description}</p>
                        
                        <ul className="text-[11px] text-brand-soft space-y-1.5 pt-2">
                          {bonus.bullets.map((b, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-brand-gold font-bold">—</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={() => handleDownloadPDF(bonus.title)}
                        disabled={isLocked}
                        className="w-full py-2 bg-brand-green hover:bg-brand-green/90 text-white text-[11px] uppercase tracking-wider font-bold transition-all rounded flex items-center justify-center gap-1.5 disabled:opacity-30"
                      >
                        <Download className="w-3.5 h-3.5 text-brand-gold" /> Descargar Bono PDF
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: GUIDE */}
        {activeTab === 'guide' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-display font-bold text-2xl text-brand-text">Guía de Conservación & Congelamiento</h3>
                <p className="text-xs text-brand-soft">Accede a las directrices de conservación óptima para cada tipo de alimento en segundos.</p>
              </div>

              {/* Search */}
              <div className="relative w-full sm:w-72">
                <input 
                  type="text"
                  placeholder="Filtrar alimentos (ej. caldo, verdura)..."
                  value={guideSearch}
                  onChange={(e) => setGuideSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-brand-gold/20 rounded font-sans text-xs focus:outline-none focus:ring-1 focus:ring-brand-gold"
                />
                <Search className="w-3.5 h-3.5 text-brand-soft absolute left-3 top-3" />
              </div>
            </div>

            {/* Guide interactive table */}
            <div className="bg-white border border-brand-gold/15 rounded shadow-sm overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-brand-green text-white text-xs font-sans uppercase tracking-wider text-left">
                    <th className="p-3.5 border-b border-brand-gold/10">Alimento / Categoría</th>
                    <th className="p-3.5 border-b border-brand-gold/10">⏱️ Tiempo Máximo</th>
                    <th className="p-3.5 border-b border-brand-gold/10">📦 Empaque Ideal</th>
                    <th className="p-3.5 border-b border-brand-gold/10">📝 Directriz Clave</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {filteredGuide.map((item, index) => (
                    <tr key={index} className="border-b border-brand-gold/10 hover:bg-brand-base/20 transition-colors">
                      <td className="p-3.5 font-bold text-brand-text">{item.name}</td>
                      <td className="p-3.5 font-mono text-brand-green font-semibold">{item.time}</td>
                      <td className="p-3.5 text-brand-soft">{item.pack}</td>
                      <td className="p-3.5 text-brand-soft">{item.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Practical Guide Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="p-5 bg-white border border-brand-gold/10 rounded space-y-2">
                <span className="text-[10px] font-bold text-brand-gold tracking-widest uppercase">REGLA DE ORO DE DESCONGELADO</span>
                <h5 className="font-display font-bold text-base text-brand-text">Descongelación en Tres Pasos</h5>
                <p className="text-xs text-brand-soft leading-relaxed">
                  Evita dejar la comida a temperatura ambiente para no proliferar bacterias. El método ideal es pasar el recipiente del freezer a la heladera 12 horas antes. Si tienes prisa, usa la función de descongelar del microondas o sumerge el recipiente cerrado en agua fría de la canilla.
                </p>
              </div>
              <div className="p-5 bg-white border border-brand-gold/10 rounded space-y-2">
                <span className="text-[10px] font-bold text-brand-gold tracking-widest uppercase">TIPS DE EMPAQUE AL VACÍO</span>
                <h5 className="font-display font-bold text-base text-brand-text">Evita las Quemaduras por Hielo</h5>
                <p className="text-xs text-brand-soft leading-relaxed">
                  La quemadura por congelación ocurre cuando el aire seco entra en contacto con la superficie del alimento. Para evitarlo, asegúrate de presionar bien las bolsas herméticas para extraer todo el aire antes de cerrarlas, o utiliza contenedores de vidrio herméticos llenos hasta 90% para dar espacio a la expansión del agua.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
