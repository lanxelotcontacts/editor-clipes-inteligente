"use client"

import { useState, useEffect } from "react"
import { Upload, Scissors, Download, Zap, Settings2, Play, FileVideo, Clock, Target, Globe, TrendingUp, Sparkles, BarChart3, Users, Link as LinkIcon, X, Trash2, RefreshCw, ChevronRight, CheckCircle2, Share2, Instagram, Youtube, Facebook, Crown, ShoppingBag, Palette, Bell, Award, Rocket, Eye, Heart, MessageCircle, ArrowUpRight, Layers, Wand2, AlertCircle, Lightbulb, Cpu, Zap as ZapIcon, Mail, UserPlus, BookOpen, Video, Shield, Lock, Gauge, MessageSquare, Smile, Frown, Meh, Users2, Send, Menu, DollarSign, TrendingDown, Copy, Check, Star, HelpCircle, UserCheck, Package, Sliders, PieChart, Activity, TrendingUpIcon, Filter, Grid, List, Calendar, Briefcase, LineChart, Search, Home as HomeIcon, FolderOpen, FileText, Image as ImageIcon, Music, Film, Code, Database, Cloud, Wifi, Smartphone, Monitor, Tablet, Headphones, Mic, Camera, Edit3, Save, FolderPlus, UserMinus, LogOut, Plus, Minus, MoreVertical, ChevronDown, ChevronUp, ExternalLink, Download as DownloadIcon, Share, Bookmark, BookmarkCheck, Clock3, TrendingUpDown, BarChart2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from "next/image"

interface Clip {
  id: number
  title: string
  duration: string
  format: string
  score: number
  keywords: string[]
  language: string
  thumbnail: string
  startTime: string
  endTime: string
  selected: boolean
  aiSuggested?: boolean
  engagement?: {
    views: number
    likes: number
    comments: number
  }
  contextAnalysis?: string
  sentiment?: "positive" | "neutral" | "negative"
  sentimentScore?: number
}

interface BatchProject {
  id: number
  name: string
  status: "pending" | "processing" | "completed"
  progress: number
  clipsGenerated: number
}

interface AnalyticsData {
  totalClips: number
  totalViews: number
  avgEngagement: number
  topKeywords: string[]
  performanceByFormat: { format: string; avgScore: number }[]
}

interface Template {
  id: number
  name: string
  description: string
  price: number
  author: string
  rating: number
  downloads: number
  thumbnail: string
  previewUrl?: string
  features?: string[]
  category?: string
  isBestseller?: boolean
  isNew?: boolean
}

interface Resource {
  id: number
  title: string
  type: "video" | "article" | "webinar"
  duration: string
  thumbnail: string
  category: string
}

interface Collaborator {
  id: number
  name: string
  email: string
  role: "editor" | "viewer"
  avatar: string
}

interface AffiliateData {
  id: string
  name: string
  email: string
  status: "pending" | "approved" | "active"
  commission: number
  sales: number
  earnings: number
  affiliateLink?: string
}

interface SupportTicket {
  id: number
  subject: string
  status: "open" | "in-progress" | "resolved"
  priority: "low" | "medium" | "high"
  createdAt: string
}

type QualityOption = "720p" | "1080p" | "4K"
type FormatOption = "9:16" | "1:1" | "16:9"
type ExportFormat = "Reels" | "Shorts" | "TikTok" | "Feed" | "YouTube"
type ThemeOption = "dark" | "blue" | "purple" | "green"
type PlanType = "free" | "pro" | "enterprise"
type VideoType = "business" | "tech" | "education" | "entertainment" | "fitness" | "cooking"
type KeywordMode = "add" | "replace"
type ViewMode = "grid" | "list"

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)
  const [videoUrl, setVideoUrl] = useState("")
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [clips, setClips] = useState<Clip[]>([])
  const [currentView, setCurrentView] = useState<"dashboard" | "upload" | "preview" | "export" | "analytics" | "batch" | "marketplace" | "resources" | "collaborate" | "affiliates" | "support" | "admin">("dashboard")
  const [selectedClip, setSelectedClip] = useState<Clip | null>(null)
  const [customKeywords, setCustomKeywords] = useState("")
  const [quality, setQuality] = useState<QualityOption>("1080p")
  const [aspectRatio, setAspectRatio] = useState<FormatOption>("9:16")
  const [exportFormat, setExportFormat] = useState<ExportFormat>("Reels")
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [onboardingStep, setOnboardingStep] = useState(0)
  const [theme, setTheme] = useState<ThemeOption>("dark")
  const [currentPlan, setCurrentPlan] = useState<PlanType>("free")
  const [batchProjects, setBatchProjects] = useState<BatchProject[]>([])
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [templates, setTemplates] = useState<Template[]>([])
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")
  const [videoType, setVideoType] = useState<VideoType>("business")
  const [keywordMode, setKeywordMode] = useState<KeywordMode>("replace")
  const [urlError, setUrlError] = useState("")
  const [analyzingContext, setAnalyzingContext] = useState(false)
  
  // Novos estados para funcionalidades avançadas
  const [showLeadCapture, setShowLeadCapture] = useState(false)
  const [leadEmail, setLeadEmail] = useState("")
  const [leadName, setLeadName] = useState("")
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [feedbackText, setFeedbackText] = useState("")
  const [resources, setResources] = useState<Resource[]>([])
  const [collaborators, setCollaborators] = useState<Collaborator[]>([])
  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState("")
  const [sentimentAnalysisEnabled, setSentimentAnalysisEnabled] = useState(true)
  const [performanceScore, setPerformanceScore] = useState(98)
  const [securityScore, setSecurityScore] = useState(100)
  
  // Estados para menu lateral
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  // Estados para feedback melhorado
  const [feedbackRating, setFeedbackRating] = useState<number>(0)
  const [feedbackCategory, setFeedbackCategory] = useState<string>("")
  const [feedbackUsability, setFeedbackUsability] = useState<string>("")
  const [feedbackFeature, setFeedbackFeature] = useState<string>("")
  const [feedbackRecommend, setFeedbackRecommend] = useState<string>("")
  
  // Estados para afiliados
  const [affiliateData, setAffiliateData] = useState<AffiliateData | null>(null)
  const [affiliateName, setAffiliateName] = useState("")
  const [affiliateEmail, setAffiliateEmail] = useState("")
  const [affiliatePhone, setAffiliatePhone] = useState("")
  const [affiliateExperience, setAffiliateExperience] = useState("")
  const [affiliateSocial, setAffiliateSocial] = useState("")
  const [affiliateLinkCopied, setAffiliateLinkCopied] = useState(false)

  // Estados para suporte
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([])
  const [newTicketSubject, setNewTicketSubject] = useState("")
  const [newTicketDescription, setNewTicketDescription] = useState("")
  const [supportAccessCode, setSupportAccessCode] = useState("")
  const [isSupportAuthorized, setIsSupportAuthorized] = useState(false)

  // Estados para admin (aba escondida)
  const [adminAccessCode, setAdminAccessCode] = useState("")
  const [isAdminAuthorized, setIsAdminAuthorized] = useState(false)
  const [showAdminAccess, setShowAdminAccess] = useState(false)

  // Estados para personalização de interface
  const [customColors, setCustomColors] = useState({
    primary: "#00E5FF",
    secondary: "#FF00E5",
    accent: "#FFE500"
  })
  const [dashboardWidgets, setDashboardWidgets] = useState<string[]>(["stats", "recent", "trending"])

  // Estados para métricas avançadas
  const [metricsView, setMetricsView] = useState<"overview" | "detailed" | "trends">("overview")
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d")

  // Estados para busca e filtros
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [priceFilter, setPriceFilter] = useState<string>("all")

  // Estados para favoritos
  const [favorites, setFavorites] = useState<number[]>([])

  // Cores do tema
  const themeColors = {
    dark: { primary: "#00E5FF", bg: "#0D0D0D" },
    blue: { primary: "#3B82F6", bg: "#0A0E1A" },
    purple: { primary: "#A855F7", bg: "#0F0A1A" },
    green: { primary: "#10B981", bg: "#0A1A0F" }
  }

  const currentTheme = themeColors[theme]

  // Keywords por tipo de vídeo
  const keywordsByVideoType: Record<VideoType, string[]> = {
    business: ["vendas", "conversão", "estratégia", "crescimento", "lucro", "ROI", "marketing", "negócio"],
    tech: ["tecnologia", "inovação", "IA", "software", "código", "desenvolvimento", "produto", "startup"],
    education: ["aprender", "tutorial", "ensino", "método", "técnica", "passo a passo", "dica", "explicação"],
    entertainment: ["diversão", "entretenimento", "viral", "trending", "momento", "reação", "engraçado", "épico"],
    fitness: ["treino", "exercício", "saúde", "fitness", "resultado", "transformação", "dieta", "corpo"],
    cooking: ["receita", "culinária", "ingrediente", "preparo", "sabor", "prato", "cozinha", "delicioso"]
  }

  // Onboarding steps
  const onboardingSteps = [
    {
      title: "Bem-vindo ao Eloid Studio",
      description: "A plataforma mais avançada para transformar vídeos longos em cortes virais",
      icon: Rocket
    },
    {
      title: "Upload inteligente",
      description: "Faça upload via arquivo ou link de qualquer plataforma",
      icon: Upload
    },
    {
      title: "IA que entende contexto",
      description: "Nossa IA analisa e sugere os melhores momentos automaticamente",
      icon: Wand2
    },
    {
      title: "Controle total",
      description: "Ajuste qualidade, formato e personalize com suas palavras-chave",
      icon: Settings2
    },
    {
      title: "Compartilhe em segundos",
      description: "Exporte e publique direto nas suas redes sociais favoritas",
      icon: Share2
    }
  ]

  useEffect(() => {
    // Carregar templates mockados com conteúdo completo
    setTemplates([
      {
        id: 1,
        name: "Viral Shorts Pack Pro",
        description: "Pack completo com 50+ templates otimizados para YouTube Shorts com alta taxa de conversão",
        price: 149.90,
        author: "Studio Pro",
        rating: 4.9,
        downloads: 3240,
        thumbnail: "gradient-1",
        previewUrl: "https://example.com/preview1",
        features: ["50+ templates", "Legendas animadas", "Transições profissionais", "Música inclusa", "Suporte 24/7"],
        category: "youtube",
        isBestseller: true
      },
      {
        id: 2,
        name: "Instagram Reels Master Kit",
        description: "Kit definitivo para criar Reels virais com efeitos premium e templates testados",
        price: 199.90,
        author: "Creative Labs",
        rating: 4.9,
        downloads: 5150,
        thumbnail: "gradient-2",
        previewUrl: "https://example.com/preview2",
        features: ["100+ templates", "Efeitos premium", "Filtros exclusivos", "Atualizações mensais", "Comunidade privada"],
        category: "instagram",
        isBestseller: true
      },
      {
        id: 3,
        name: "TikTok Trends 2024 Bundle",
        description: "Bundle completo seguindo as últimas tendências do TikTok com templates atualizados semanalmente",
        price: 129.90,
        author: "Trend Makers",
        rating: 4.8,
        downloads: 2890,
        thumbnail: "gradient-3",
        previewUrl: "https://example.com/preview3",
        features: ["Trends atualizadas", "Templates semanais", "Hashtags otimizadas", "Guia de uso", "Bônus exclusivos"],
        category: "tiktok",
        isNew: true
      },
      {
        id: 4,
        name: "Business Growth Pack",
        description: "Templates profissionais para empresas e empreendedores que querem crescer nas redes",
        price: 249.90,
        author: "Business Pro",
        rating: 5.0,
        downloads: 1560,
        thumbnail: "gradient-4",
        previewUrl: "https://example.com/preview4",
        features: ["Templates corporativos", "Branding personalizado", "Consultoria inclusa", "ROI garantido", "Suporte premium"],
        category: "business"
      },
      {
        id: 5,
        name: "Creator Starter Pack",
        description: "Pack inicial perfeito para criadores de conteúdo que estão começando",
        price: 79.90,
        author: "Creator Hub",
        rating: 4.7,
        downloads: 4320,
        thumbnail: "gradient-5",
        previewUrl: "https://example.com/preview5",
        features: ["30+ templates", "Guia para iniciantes", "Tutoriais em vídeo", "Comunidade ativa", "Atualizações gratuitas"],
        category: "starter",
        isNew: true
      },
      {
        id: 6,
        name: "Premium All-in-One Bundle",
        description: "Bundle definitivo com TODOS os templates disponíveis + acesso vitalício a novos lançamentos",
        price: 499.90,
        author: "Eloid Studio",
        rating: 5.0,
        downloads: 890,
        thumbnail: "gradient-6",
        previewUrl: "https://example.com/preview6",
        features: ["200+ templates", "Acesso vitalício", "Todos os futuros templates", "Suporte prioritário", "Licença comercial"],
        category: "premium",
        isBestseller: true
      }
    ])

    // Carregar recursos educacionais
    setResources([
      {
        id: 1,
        title: "Como criar cortes virais em 10 minutos",
        type: "video",
        duration: "12:30",
        thumbnail: "resource-1",
        category: "Tutorial"
      },
      {
        id: 2,
        title: "Guia completo de palavras-chave para Reels",
        type: "article",
        duration: "8 min leitura",
        thumbnail: "resource-2",
        category: "Guia"
      },
      {
        id: 3,
        title: "Webinar: Estratégias de crescimento com vídeos curtos",
        type: "webinar",
        duration: "45:00",
        thumbnail: "resource-3",
        category: "Webinar"
      },
      {
        id: 4,
        title: "Análise de sentimento: Como usar a IA a seu favor",
        type: "video",
        duration: "15:20",
        thumbnail: "resource-4",
        category: "Tutorial"
      }
    ])

    // Gerar analytics mockados
    setAnalytics({
      totalClips: 156,
      totalViews: 487300,
      avgEngagement: 8.4,
      topKeywords: ["vendas", "conversão", "estratégia", "crescimento", "lucro"],
      performanceByFormat: [
        { format: "9:16", avgScore: 91 },
        { format: "1:1", avgScore: 88.5 },
        { format: "16:9", avgScore: 85 }
      ]
    })
  }, [])

  const showFeedback = (message: string) => {
    setNotificationMessage(message)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  const validateVideoUrl = (url: string): boolean => {
    if (!url.trim()) {
      setUrlError("Por favor, insira uma URL")
      return false
    }

    const validPlatforms = [
      'youtube.com', 'youtu.be',
      'vimeo.com',
      'facebook.com', 'fb.watch',
      'instagram.com',
      'tiktok.com',
      'twitch.tv',
      'dailymotion.com'
    ]

    const isValidUrl = validPlatforms.some(platform => url.toLowerCase().includes(platform))
    
    if (!isValidUrl) {
      setUrlError("URL não suportada. Use YouTube, Vimeo, Facebook, Instagram, TikTok, Twitch ou Dailymotion")
      return false
    }

    setUrlError("")
    return true
  }

  const detectVideoType = (url: string): VideoType => {
    const urlLower = url.toLowerCase()
    
    if (urlLower.includes('fitness') || urlLower.includes('workout') || urlLower.includes('treino')) {
      return 'fitness'
    }
    if (urlLower.includes('cook') || urlLower.includes('recipe') || urlLower.includes('food')) {
      return 'cooking'
    }
    if (urlLower.includes('tech') || urlLower.includes('code') || urlLower.includes('programming')) {
      return 'tech'
    }
    if (urlLower.includes('tutorial') || urlLower.includes('learn') || urlLower.includes('education')) {
      return 'education'
    }
    if (urlLower.includes('funny') || urlLower.includes('comedy') || urlLower.includes('entertainment')) {
      return 'entertainment'
    }
    
    return 'business'
  }

  const analyzeSentiment = (title: string): { sentiment: "positive" | "neutral" | "negative", score: number } => {
    const positiveWords = ['sucesso', 'melhor', 'incrível', 'perfeito', 'transformação', 'crescimento', 'lucro']
    const negativeWords = ['erro', 'problema', 'falha', 'difícil', 'ruim']
    
    const titleLower = title.toLowerCase()
    const hasPositive = positiveWords.some(word => titleLower.includes(word))
    const hasNegative = negativeWords.some(word => titleLower.includes(word))
    
    if (hasPositive && !hasNegative) {
      return { sentiment: 'positive', score: 85 + Math.random() * 15 }
    } else if (hasNegative && !hasPositive) {
      return { sentiment: 'negative', score: 40 + Math.random() * 20 }
    } else {
      return { sentiment: 'neutral', score: 60 + Math.random() * 20 }
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file.name)
      const detectedType = detectVideoType(file.name)
      setVideoType(detectedType)
      startProcessing(detectedType)
      showFeedback("Upload iniciado com sucesso!")
    }
  }

  const handleUrlUpload = () => {
    if (!validateVideoUrl(videoUrl)) {
      return
    }
    
    setUploadedFile(videoUrl)
    const detectedType = detectVideoType(videoUrl)
    setVideoType(detectedType)
    startProcessing(detectedType)
    showFeedback("Processamento iniciado!")
  }

  const startProcessing = (type: VideoType) => {
    setProcessing(true)
    setProgress(0)
    setCurrentView("upload")
    setAnalyzingContext(true)
    
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 10
      setProgress(currentProgress)
      if (currentProgress >= 100) {
        clearInterval(interval)
        setProcessing(false)
        setAnalyzingContext(false)
        generateMockClips(type)
        setCurrentView("preview")
        showFeedback("Clipes gerados com sucesso!")
      }
    }, 400)
  }

  const calculateKeywordRelevance = (clipKeywords: string[], targetKeywords: string[]): number => {
    if (targetKeywords.length === 0) return 85
    
    const matches = clipKeywords.filter(k => 
      targetKeywords.some(tk => tk.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(tk.toLowerCase()))
    ).length
    
    const relevanceBonus = (matches / targetKeywords.length) * 15
    return Math.min(100, 85 + relevanceBonus)
  }

  const generateMockClips = (type: VideoType) => {
    const relevantKeywords = keywordsByVideoType[type]
    
    const clipTemplates = {
      business: [
        { title: "Como aumentar conversão em 40%", context: "Análise de métricas e otimização de funil" },
        { title: "Erro fatal que mata seu negócio", context: "Identificação de problemas críticos" },
        { title: "3 passos para escalar rápido", context: "Estratégia de crescimento acelerado" },
        { title: "O que ninguém te conta sobre tráfego", context: "Insights sobre aquisição de clientes" },
        { title: "Segredo dos top 1% em vendas", context: "Técnicas avançadas de fechamento" },
        { title: "Como validar ideia em 48h", context: "Metodologia de validação rápida" }
      ],
      tech: [
        { title: "IA que revoluciona desenvolvimento", context: "Ferramentas de automação de código" },
        { title: "Erro que 90% dos devs cometem", context: "Boas práticas de programação" },
        { title: "Stack tech para 2024", context: "Tecnologias emergentes e tendências" },
        { title: "Como escalar sua aplicação", context: "Arquitetura e performance" },
        { title: "Deploy perfeito em 5 minutos", context: "Automação de CI/CD" },
        { title: "Segurança que você ignora", context: "Vulnerabilidades comuns" }
      ],
      education: [
        { title: "Aprenda isso em 10 minutos", context: "Tutorial rápido e prático" },
        { title: "Método que ninguém ensina", context: "Técnica de aprendizado acelerado" },
        { title: "Passo a passo completo", context: "Guia detalhado para iniciantes" },
        { title: "Dica que mudou tudo", context: "Insight transformador" },
        { title: "Como dominar em 30 dias", context: "Plano de estudos estruturado" },
        { title: "Erro que te impede de aprender", context: "Bloqueios mentais comuns" }
      ],
      entertainment: [
        { title: "Momento mais épico do vídeo", context: "Clímax emocional" },
        { title: "Reação inesperada", context: "Momento de surpresa genuína" },
        { title: "Isso não deveria ser engraçado", context: "Humor espontâneo" },
        { title: "Plot twist inacreditável", context: "Reviravolta surpreendente" },
        { title: "Momento viral do ano", context: "Conteúdo com potencial viral" },
        { title: "Você não vai acreditar nisso", context: "Situação extraordinária" }
      ],
      fitness: [
        { title: "Exercício que transforma o corpo", context: "Movimento de alta eficiência" },
        { title: "Erro que impede resultados", context: "Correção de técnica" },
        { title: "Treino de 15 minutos", context: "Rotina rápida e eficaz" },
        { title: "Transformação em 30 dias", context: "Resultados visíveis" },
        { title: "Segredo dos atletas", context: "Técnica profissional" },
        { title: "Como acelerar metabolismo", context: "Otimização metabólica" }
      ],
      cooking: [
        { title: "Receita em 10 minutos", context: "Preparo rápido e fácil" },
        { title: "Segredo do sabor perfeito", context: "Técnica culinária especial" },
        { title: "Ingrediente que muda tudo", context: "Componente transformador" },
        { title: "Truque de chef profissional", context: "Técnica de alta gastronomia" },
        { title: "Prato que impressiona", context: "Apresentação impecável" },
        { title: "Erro que estraga a receita", context: "Correção de técnica" }
      ]
    }

    const templates = clipTemplates[type]
    
    const mockClips: Clip[] = templates.map((template, index) => {
      const clipKeywords = relevantKeywords.slice(index, index + 3)
      const score = 85 + Math.floor(Math.random() * 15)
      const sentimentData = sentimentAnalysisEnabled ? analyzeSentiment(template.title) : undefined
      
      return {
        id: index + 1,
        title: template.title,
        duration: `0:${35 + Math.floor(Math.random() * 25)}`,
        format: ["9:16", "1:1", "16:9"][Math.floor(Math.random() * 3)] as FormatOption,
        score,
        keywords: clipKeywords,
        language: "PT-BR",
        thumbnail: `gradient-${index + 1}`,
        startTime: `00:${String(index * 2 + 2).padStart(2, '0')}:15`,
        endTime: `00:${String(index * 2 + 3).padStart(2, '0')}:00`,
        selected: index < 3,
        aiSuggested: score > 90,
        engagement: { 
          views: 8000 + Math.floor(Math.random() * 12000), 
          likes: 600 + Math.floor(Math.random() * 900), 
          comments: 25 + Math.floor(Math.random() * 75) 
        },
        contextAnalysis: template.context,
        sentiment: sentimentData?.sentiment,
        sentimentScore: sentimentData?.score
      }
    })
    
    setClips(mockClips)
  }

  const handleRegenerateByKeywords = () => {
    if (!customKeywords.trim()) return
    
    setProcessing(true)
    setProgress(0)
    setAnalyzingContext(true)
    
    const userKeywords = customKeywords.split(',').map(k => k.trim().toLowerCase())
    
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 15
      setProgress(currentProgress)
      if (currentProgress >= 100) {
        clearInterval(interval)
        setProcessing(false)
        setAnalyzingContext(false)
        
        const newClips = clips.map(clip => {
          let newKeywords: string[]
          
          if (keywordMode === "replace") {
            newKeywords = userKeywords
          } else {
            newKeywords = [...new Set([...clip.keywords, ...userKeywords])]
          }
          
          const newScore = calculateKeywordRelevance(newKeywords, userKeywords)
          
          return {
            ...clip,
            keywords: newKeywords,
            score: newScore,
            aiSuggested: newScore > 90
          }
        })
        
        setClips(newClips.sort((a, b) => b.score - a.score))
        showFeedback(`Clipes regenerados com suas palavras-chave (modo: ${keywordMode === "replace" ? "substituir" : "adicionar"})!`)
      }
    }, 300)
  }

  const handleDeleteClip = (clipId: number) => {
    setClips(clips.filter(clip => clip.id !== clipId))
    if (selectedClip?.id === clipId) {
      setSelectedClip(null)
    }
    showFeedback("Clipe removido")
  }

  const handlePlayClip = (clip: Clip) => {
    setSelectedClip(clip)
    showFeedback(`Reproduzindo: ${clip.title}`)
  }

  const handleToggleClipSelection = (clipId: number) => {
    setClips(clips.map(clip => 
      clip.id === clipId ? { ...clip, selected: !clip.selected } : clip
    ))
  }

  const handleBatchQualityChange = (newQuality: QualityOption) => {
    setQuality(newQuality)
    showFeedback(`Qualidade alterada para ${newQuality}`)
  }

  const handleBatchFormatChange = (newFormat: FormatOption) => {
    setAspectRatio(newFormat)
    setClips(clips.map(clip => 
      clip.selected ? { ...clip, format: newFormat } : clip
    ))
    showFeedback(`Formato alterado para ${newFormat}`)
  }

  const handleExportClips = () => {
    const selectedClips = clips.filter(clip => clip.selected)
    if (selectedClips.length === 0) return

    setIsExporting(true)
    setExportProgress(0)
    setCurrentView("export")

    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 10
      setExportProgress(currentProgress)
      if (currentProgress >= 100) {
        clearInterval(interval)
        setIsExporting(false)
        
        selectedClips.forEach((clip, index) => {
          setTimeout(() => {
            console.log(`Exportando: ${clip.title} - ${quality} - ${clip.format}`)
          }, index * 500)
        })
        showFeedback(`${selectedClips.length} clipes exportados com sucesso!`)
      }
    }, 400)
  }

  const handleShareToSocial = (platform: string) => {
    showFeedback(`Compartilhando no ${platform}...`)
  }

  const handleBatchUpload = (files: FileList) => {
    const newProjects: BatchProject[] = Array.from(files).map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      status: "pending",
      progress: 0,
      clipsGenerated: 0
    }))
    
    setBatchProjects([...batchProjects, ...newProjects])
    showFeedback(`${files.length} vídeos adicionados ao batch`)
    
    newProjects.forEach((project, index) => {
      setTimeout(() => {
        processBatchProject(project.id)
      }, index * 2000)
    })
  }

  const processBatchProject = (projectId: number) => {
    const interval = setInterval(() => {
      setBatchProjects(prev => prev.map(p => {
        if (p.id === projectId) {
          const newProgress = Math.min(100, p.progress + 10)
          return {
            ...p,
            status: newProgress === 100 ? "completed" : "processing",
            progress: newProgress,
            clipsGenerated: newProgress === 100 ? Math.floor(Math.random() * 5) + 3 : p.clipsGenerated
          }
        }
        return p
      }))
    }, 500)

    setTimeout(() => clearInterval(interval), 5000)
  }

  const handleNewProject = () => {
    setUploadedFile(null)
    setVideoUrl("")
    setClips([])
    setCurrentView("upload")
    setSelectedClip(null)
    setCustomKeywords("")
    setProgress(0)
    setExportProgress(0)
    setUrlError("")
  }

  const handleLeadCapture = () => {
    if (!leadEmail || !leadName) {
      showFeedback("Por favor, preencha todos os campos")
      return
    }
    
    console.log("Lead capturado:", { name: leadName, email: leadEmail })
    showFeedback("Obrigado! Você receberá conteúdo exclusivo em breve 🚀")
    setShowLeadCapture(false)
    
    setTimeout(() => {
      showFeedback("📧 E-mail de boas-vindas enviado!")
    }, 2000)
  }

  const handleFeedbackSubmit = () => {
    if (!feedbackText.trim() || feedbackRating === 0) {
      showFeedback("Por favor, preencha todos os campos obrigatórios")
      return
    }
    
    console.log("Feedback recebido:", {
      rating: feedbackRating,
      category: feedbackCategory,
      usability: feedbackUsability,
      feature: feedbackFeature,
      recommend: feedbackRecommend,
      text: feedbackText
    })
    showFeedback("Obrigado pelo seu feedback! Vamos melhorar ainda mais 💪")
    setShowFeedbackModal(false)
    setFeedbackText("")
    setFeedbackRating(0)
    setFeedbackCategory("")
    setFeedbackUsability("")
    setFeedbackFeature("")
    setFeedbackRecommend("")
  }

  const handleAddCollaborator = () => {
    if (!newCollaboratorEmail.trim()) {
      showFeedback("Digite um e-mail válido")
      return
    }
    
    const newCollab: Collaborator = {
      id: Date.now(),
      name: newCollaboratorEmail.split('@')[0],
      email: newCollaboratorEmail,
      role: "editor",
      avatar: `avatar-${collaborators.length + 1}`
    }
    
    setCollaborators([...collaborators, newCollab])
    setNewCollaboratorEmail("")
    showFeedback(`Convite enviado para ${newCollaboratorEmail}`)
  }

  const handleAffiliateSubmit = () => {
    if (!affiliateName || !affiliateEmail) {
      showFeedback("Por favor, preencha todos os campos obrigatórios")
      return
    }
    
    const affiliateId = `AFF${Date.now().toString().slice(-6)}`
    const affiliateLink = `https://eloidstudio.com/ref/${affiliateId}`
    
    const newAffiliate: AffiliateData = {
      id: affiliateId,
      name: affiliateName,
      email: affiliateEmail,
      status: "pending",
      commission: 30,
      sales: 0,
      earnings: 0,
      affiliateLink
    }
    
    setAffiliateData(newAffiliate)
    showFeedback("Solicitação enviada! Você receberá um e-mail com mais detalhes em breve 🚀")
    
    setAffiliateName("")
    setAffiliateEmail("")
    setAffiliatePhone("")
    setAffiliateExperience("")
    setAffiliateSocial("")
  }

  const copyAffiliateLink = () => {
    if (affiliateData?.affiliateLink) {
      navigator.clipboard.writeText(affiliateData.affiliateLink)
      setAffiliateLinkCopied(true)
      showFeedback("Link copiado para área de transferência!")
      setTimeout(() => setAffiliateLinkCopied(false), 2000)
    }
  }

  const handleSupportTicketSubmit = () => {
    if (!newTicketSubject.trim() || !newTicketDescription.trim()) {
      showFeedback("Por favor, preencha todos os campos")
      return
    }

    const newTicket: SupportTicket = {
      id: Date.now(),
      subject: newTicketSubject,
      status: "open",
      priority: "medium",
      createdAt: new Date().toISOString()
    }

    setSupportTickets([newTicket, ...supportTickets])
    setNewTicketSubject("")
    setNewTicketDescription("")
    showFeedback("Ticket criado com sucesso! Nossa equipe responderá em breve.")
  }

  const handleSupportAccess = () => {
    if (supportAccessCode === "SUPPORT2024") {
      setIsSupportAuthorized(true)
      showFeedback("Acesso autorizado ao painel de suporte!")
    } else {
      showFeedback("Código de acesso inválido")
    }
  }

  const handleAdminAccess = () => {
    if (adminAccessCode === "ADMIN2024") {
      setIsAdminAuthorized(true)
      setShowAdminAccess(false)
      showFeedback("Acesso administrativo concedido!")
    } else {
      showFeedback("Código de acesso inválido")
    }
  }

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id))
      showFeedback("Removido dos favoritos")
    } else {
      setFavorites([...favorites, id])
      showFeedback("Adicionado aos favoritos")
    }
  }

  const selectedClipsCount = clips.filter(c => c.selected).length

  // Filtrar templates
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    const matchesPrice = priceFilter === "all" || 
                        (priceFilter === "free" && template.price === 0) ||
                        (priceFilter === "low" && template.price > 0 && template.price <= 100) ||
                        (priceFilter === "medium" && template.price > 100 && template.price <= 200) ||
                        (priceFilter === "high" && template.price > 200)
    
    return matchesSearch && matchesCategory && matchesPrice
  })

  // Modal de captura de leads
  if (showLeadCapture) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <Card className="max-w-lg w-full bg-[#0D0D0D] border-[#00E5FF]/30 p-8 relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowLeadCapture(false)}
            className="absolute top-4 right-4 text-[#FFFFFF]/50 hover:text-[#00E5FF]"
          >
            <X className="w-4 h-4" />
          </Button>
          
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-[#00E5FF]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Rocket className="w-8 h-8 text-[#00E5FF]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Desbloqueie todo o potencial do Eloid Studio
            </h3>
            <p className="text-[#FFFFFF]/60">
              Receba dicas exclusivas, templates gratuitos e acesso antecipado a novos recursos
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-white mb-2 block">Nome</Label>
              <Input
                placeholder="Seu nome"
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                className="bg-[#0D0D0D] border-[#1A1A1A] text-white"
              />
            </div>
            <div>
              <Label className="text-white mb-2 block">E-mail</Label>
              <Input
                type="email"
                placeholder="seu@email.com"
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                className="bg-[#0D0D0D] border-[#1A1A1A] text-white"
              />
            </div>
            <Button
              onClick={handleLeadCapture}
              className="w-full bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-[#0D0D0D] font-semibold py-6"
            >
              <Mail className="w-4 h-4 mr-2" />
              Quero receber conteúdo exclusivo
            </Button>
            <p className="text-xs text-[#FFFFFF]/40 text-center">
              Seus dados estão protegidos. Conforme LGPD e GDPR.
            </p>
          </div>
        </Card>
      </div>
    )
  }

  // Modal de feedback melhorado
  if (showFeedbackModal) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
        <Card className="max-w-2xl w-full bg-[#0D0D0D] border-[#00E5FF]/30 p-8 relative my-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFeedbackModal(false)}
            className="absolute top-4 right-4 text-[#FFFFFF]/50 hover:text-[#00E5FF]"
          >
            <X className="w-4 h-4" />
          </Button>
          
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-[#00E5FF]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-[#00E5FF]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Sua opinião é importante
            </h3>
            <p className="text-[#FFFFFF]/60">
              Ajude-nos a melhorar o Eloid Studio com seu feedback detalhado
            </p>
          </div>

          <div className="space-y-6">
            {/* Avaliação por estrelas */}
            <div>
              <Label className="text-white mb-3 block">Como você avalia sua experiência? *</Label>
              <div className="flex gap-2 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setFeedbackRating(star)}
                    className="transition-all duration-200 hover:scale-110"
                  >
                    <Star
                      className={`w-10 h-10 ${
                        star <= feedbackRating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-600 hover:text-yellow-400"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Categoria do feedback */}
            <div>
              <Label className="text-white mb-3 block">Qual área você quer comentar? *</Label>
              <RadioGroup value={feedbackCategory} onValueChange={setFeedbackCategory}>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-[#00E5FF]/5 transition-colors">
                    <RadioGroupItem value="interface" id="interface" className="border-[#00E5FF] text-[#00E5FF]" />
                    <Label htmlFor="interface" className="text-white cursor-pointer flex-1">Interface e Design</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-[#00E5FF]/5 transition-colors">
                    <RadioGroupItem value="performance" id="performance" className="border-[#00E5FF] text-[#00E5FF]" />
                    <Label htmlFor="performance" className="text-white cursor-pointer flex-1">Performance e Velocidade</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-[#00E5FF]/5 transition-colors">
                    <RadioGroupItem value="features" id="features" className="border-[#00E5FF] text-[#00E5FF]" />
                    <Label htmlFor="features" className="text-white cursor-pointer flex-1">Funcionalidades</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-[#00E5FF]/5 transition-colors">
                    <RadioGroupItem value="bug" id="bug" className="border-[#00E5FF] text-[#00E5FF]" />
                    <Label htmlFor="bug" className="text-white cursor-pointer flex-1">Reportar Bug</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-[#00E5FF]/5 transition-colors">
                    <RadioGroupItem value="other" id="other" className="border-[#00E5FF] text-[#00E5FF]" />
                    <Label htmlFor="other" className="text-white cursor-pointer flex-1">Outro</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Facilidade de uso */}
            <div>
              <Label className="text-white mb-3 block">Quão fácil foi usar o Eloid Studio?</Label>
              <Select value={feedbackUsability} onValueChange={setFeedbackUsability}>
                <SelectTrigger className="bg-[#0D0D0D] border-[#1A1A1A] text-white">
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
                <SelectContent className="bg-[#0D0D0D] border-[#1A1A1A]">
                  <SelectItem value="very-easy" className="text-white">Muito fácil</SelectItem>
                  <SelectItem value="easy" className="text-white">Fácil</SelectItem>
                  <SelectItem value="neutral" className="text-white">Neutro</SelectItem>
                  <SelectItem value="difficult" className="text-white">Difícil</SelectItem>
                  <SelectItem value="very-difficult" className="text-white">Muito difícil</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Funcionalidade mais útil */}
            <div>
              <Label className="text-white mb-3 block">Qual funcionalidade você mais utiliza?</Label>
              <Select value={feedbackFeature} onValueChange={setFeedbackFeature}>
                <SelectTrigger className="bg-[#0D0D0D] border-[#1A1A1A] text-white">
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
                <SelectContent className="bg-[#0D0D0D] border-[#1A1A1A]">
                  <SelectItem value="ai-clips" className="text-white">Geração de clipes com IA</SelectItem>
                  <SelectItem value="keywords" className="text-white">Palavras-chave personalizadas</SelectItem>
                  <SelectItem value="batch" className="text-white">Processamento em lote</SelectItem>
                  <SelectItem value="export" className="text-white">Exportação e compartilhamento</SelectItem>
                  <SelectItem value="analytics" className="text-white">Analytics</SelectItem>
                  <SelectItem value="templates" className="text-white">Templates</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Recomendação */}
            <div>
              <Label className="text-white mb-3 block">Você recomendaria o Eloid Studio?</Label>
              <RadioGroup value={feedbackRecommend} onValueChange={setFeedbackRecommend}>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-[#00E5FF]/5 transition-colors">
                    <RadioGroupItem value="definitely" id="definitely" className="border-[#00E5FF] text-[#00E5FF]" />
                    <Label htmlFor="definitely" className="text-white cursor-pointer flex-1">Definitivamente sim</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-[#00E5FF]/5 transition-colors">
                    <RadioGroupItem value="probably" id="probably" className="border-[#00E5FF] text-[#00E5FF]" />
                    <Label htmlFor="probably" className="text-white cursor-pointer flex-1">Provavelmente sim</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-[#00E5FF]/5 transition-colors">
                    <RadioGroupItem value="maybe" id="maybe" className="border-[#00E5FF] text-[#00E5FF]" />
                    <Label htmlFor="maybe" className="text-white cursor-pointer flex-1">Talvez</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-[#00E5FF]/5 transition-colors">
                    <RadioGroupItem value="probably-not" id="probably-not" className="border-[#00E5FF] text-[#00E5FF]" />
                    <Label htmlFor="probably-not" className="text-white cursor-pointer flex-1">Provavelmente não</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-[#00E5FF]/5 transition-colors">
                    <RadioGroupItem value="definitely-not" id="definitely-not" className="border-[#00E5FF] text-[#00E5FF]" />
                    <Label htmlFor="definitely-not" className="text-white cursor-pointer flex-1">Definitivamente não</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Comentários adicionais */}
            <div>
              <Label className="text-white mb-3 block">Conte-nos mais sobre sua experiência *</Label>
              <Textarea
                placeholder="Compartilhe suas sugestões, problemas encontrados ou elogios..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="bg-[#0D0D0D] border-[#1A1A1A] text-white min-h-[120px]"
              />
            </div>

            <Button
              onClick={handleFeedbackSubmit}
              className="w-full bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-[#0D0D0D] font-semibold py-6"
            >
              <Send className="w-4 h-4 mr-2" />
              Enviar feedback
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  // Modal de acesso admin
  if (showAdminAccess) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <Card className="max-w-md w-full bg-[#0D0D0D] border-red-500/30 p-8 relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdminAccess(false)}
            className="absolute top-4 right-4 text-[#FFFFFF]/50 hover:text-red-500"
          >
            <X className="w-4 h-4" />
          </Button>
          
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Acesso Administrativo
            </h3>
            <p className="text-[#FFFFFF]/60">
              Esta área é restrita. Insira o código de acesso.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-white mb-2 block">Código de Acesso</Label>
              <Input
                type="password"
                placeholder="Digite o código"
                value={adminAccessCode}
                onChange={(e) => setAdminAccessCode(e.target.value)}
                className="bg-[#0D0D0D] border-[#1A1A1A] text-white"
              />
            </div>
            <Button
              onClick={handleAdminAccess}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-6"
            >
              <Lock className="w-4 h-4 mr-2" />
              Acessar
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  // Fechar onboarding
  if (showOnboarding && onboardingStep < onboardingSteps.length) {
    const step = onboardingSteps[onboardingStep]
    const Icon = step.icon

    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full bg-[#0D0D0D] border-[#1A1A1A] p-12 text-center">
          <div className="w-24 h-24 bg-[#00E5FF]/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Icon className="w-12 h-12 text-[#00E5FF]" />
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-4">{step.title}</h2>
          <p className="text-xl text-[#FFFFFF]/60 mb-12">{step.description}</p>
          
          <div className="flex items-center justify-center gap-2 mb-8">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === onboardingStep ? 'w-8 bg-[#00E5FF]' : 'w-2 bg-[#1A1A1A]'
                }`}
              />
            ))}
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              variant="ghost"
              onClick={() => setShowOnboarding(false)}
              className="text-[#FFFFFF]/70 hover:text-[#00E5FF]"
            >
              Pular tutorial
            </Button>
            <Button
              onClick={() => {
                if (onboardingStep === onboardingSteps.length - 1) {
                  setShowOnboarding(false)
                } else {
                  setOnboardingStep(onboardingStep + 1)
                }
              }}
              className="bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-[#0D0D0D] font-semibold px-8"
            >
              {onboardingStep === onboardingSteps.length - 1 ? 'Começar' : 'Próximo'}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: currentTheme.bg }}>
      {/* Notificação flutuante */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top">
          <Card className="bg-[#0D0D0D] border-[#00E5FF]/50 p-4 shadow-xl shadow-[#00E5FF]/20">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#00E5FF]" />
              <p className="text-white font-medium">{notificationMessage}</p>
            </div>
          </Card>
        </div>
      )}

      {/* Header Premium com menu lateral */}
      <header className="border-b border-[#1A1A1A] bg-[#0D0D0D]/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-[#FFFFFF]/70 hover:text-[#00E5FF]"
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              <div 
                className="cursor-pointer"
                onClick={(e) => {
                  if (e.detail === 3) {
                    setShowAdminAccess(true)
                  }
                }}
              >
                <Image 
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/b4235458-8d82-484a-bcff-337f4c92b36f.png" 
                  alt="Eloid Studio Logo" 
                  width={36}
                  height={36}
                  className="w-9 h-9"
                />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Eloid Studio</span>
              {currentPlan === "pro" && (
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                  <Crown className="w-3 h-3 mr-1" />
                  PRO
                </Badge>
              )}
            </div>
            
            {/* Navegação desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setCurrentView("dashboard")}
                className="text-[#FFFFFF]/70 hover:text-[#00E5FF] hover:bg-[#00E5FF]/10 transition-all duration-300"
              >
                <HomeIcon className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setCurrentView("analytics")}
                className="text-[#FFFFFF]/70 hover:text-[#00E5FF] hover:bg-[#00E5FF]/10 transition-all duration-300"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setCurrentView("batch")}
                className="text-[#FFFFFF]/70 hover:text-[#00E5FF] hover:bg-[#00E5FF]/10 transition-all duration-300"
              >
                <Layers className="w-4 h-4 mr-2" />
                Batch
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setCurrentView("marketplace")}
                className="text-[#FFFFFF]/70 hover:text-[#00E5FF] hover:bg-[#00E5FF]/10 transition-all duration-300"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Templates
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setCurrentView("resources")}
                className="text-[#FFFFFF]/70 hover:text-[#00E5FF] hover:bg-[#00E5FF]/10 transition-all duration-300"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Recursos
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setCurrentView("collaborate")}
                className="text-[#FFFFFF]/70 hover:text-[#00E5FF] hover:bg-[#00E5FF]/10 transition-all duration-300"
              >
                <Users2 className="w-4 h-4 mr-2" />
                Colaborar
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setCurrentView("affiliates")}
                className="text-[#FFFFFF]/70 hover:text-[#00E5FF] hover:bg-[#00E5FF]/10 transition-all duration-300"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Afiliados
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setCurrentView("support")}
                className="text-[#FFFFFF]/70 hover:text-[#00E5FF] hover:bg-[#00E5FF]/10 transition-all duration-300"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Suporte
              </Button>
              
              {uploadedFile && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleNewProject}
                  className="text-[#FFFFFF]/70 hover:text-[#00E5FF] hover:bg-[#00E5FF]/10 transition-all duration-300"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Novo projeto
                </Button>
              )}
              
              <Select value={theme} onValueChange={(value: ThemeOption) => setTheme(value)}>
                <SelectTrigger className="w-[120px] bg-[#0D0D0D] border-[#1A1A1A] text-white">
                  <Palette className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#0D0D0D] border-[#1A1A1A]">
                  <SelectItem value="dark" className="text-white">Dark</SelectItem>
                  <SelectItem value="blue" className="text-white">Blue</SelectItem>
                  <SelectItem value="purple" className="text-white">Purple</SelectItem>
                  <SelectItem value="green" className="text-white">Green</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowFeedbackModal(true)}
                className="text-[#FFFFFF]/70 hover:text-[#00E5FF] hover:bg-[#00E5FF]/10 transition-all duration-300"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Feedback
              </Button>

              <Button 
                variant="ghost" 
                size="sm" 
                className="text-[#FFFFFF]/70 hover:text-[#00E5FF] hover:bg-[#00E5FF]/10 transition-all duration-300"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                150 créditos
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-[#1A1A1A] text-[#FFFFFF]/70 hover:text-[#00E5FF] hover:border-[#00E5FF]/30 hover:bg-[#00E5FF]/5 transition-all duration-300"
              >
                <Settings2 className="w-4 h-4 mr-2" />
                Configurações
              </Button>

              {isAdminAuthorized && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setCurrentView("admin")}
                  className="text-red-500/70 hover:text-red-500 hover:bg-red-500/10 transition-all duration-300"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Menu lateral (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="w-80 h-full bg-[#0D0D0D] border-r border-[#1A1A1A] p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-white font-bold text-lg">Menu</h3>
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                <X className="w-5 h-5 text-[#FFFFFF]/70" />
              </Button>
            </div>
            
            <div className="space-y-2">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-[#FFFFFF]/70 hover:text-[#00E5FF] hover:bg-[#00E5FF]/10"
                onClick={() => { setCurrentView("dashboard"); setSidebarOpen(false); }}
              >
                <HomeIcon className="w-4 h-4 mr-3" />
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-[#FFFFFF]/70 hover:text-[#00E5FF] hover:bg-[#00E5FF]/10"
                onClick={() => { setCurrentView("analytics"); setSidebarOpen(false); }}
              >
                <BarChart3 className="w-4 h-4 mr-3" />
                Analytics
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-[#FFFFFF]/70 hover:text-[#00E5FF] hover:bg-[#00E5FF]/10"
                onClick={() => { setCurrentView("batch"); setSidebarOpen(false); }}
              >
                <Layers className="w-4 h-4 mr-3" />
                Batch
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-[#FFFFFF]/70 hover:text-[#00E5FF] hover:bg-[#00E5FF]/10"
                onClick={() => { setCurrentView("marketplace"); setSidebarOpen(false); }}
              >
                <ShoppingBag className="w-4 h-4 mr-3" />
                Templates
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-[#FFFFFF]/70 hover:text-[#00E5FF] hover:bg-[#00E5FF]/10"
                onClick={() => { setCurrentView("resources"); setSidebarOpen(false); }}
              >
                <BookOpen className="w-4 h-4 mr-3" />
                Recursos
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-[#FFFFFF]/70 hover:text-[#00E5FF] hover:bg-[#00E5FF]/10"
                onClick={() => { setCurrentView("collaborate"); setSidebarOpen(false); }}
              >
                <Users2 className="w-4 h-4 mr-3" />
                Colaborar
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-[#FFFFFF]/70 hover:text-[#00E5FF] hover:bg-[#00E5FF]/10"
                onClick={() => { setCurrentView("affiliates"); setSidebarOpen(false); }}
              >
                <DollarSign className="w-4 h-4 mr-3" />
                Afiliados
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-[#FFFFFF]/70 hover:text-[#00E5FF] hover:bg-[#00E5FF]/10"
                onClick={() => { setCurrentView("support"); setSidebarOpen(false); }}
              >
                <HelpCircle className="w-4 h-4 mr-3" />
                Suporte
              </Button>
              
              <Separator className="my-4 bg-[#1A1A1A]" />
              
              <Button 
                variant="ghost" 
                className="w-full justify-start text-[#FFFFFF]/70 hover:text-[#00E5FF] hover:bg-[#00E5FF]/10"
                onClick={() => { setShowFeedbackModal(true); setSidebarOpen(false); }}
              >
                <MessageSquare className="w-4 h-4 mr-3" />
                Feedback
              </Button>
              
              {uploadedFile && (
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-[#FFFFFF]/70 hover:text-[#00E5FF] hover:bg-[#00E5FF]/10"
                  onClick={() => { handleNewProject(); setSidebarOpen(false); }}
                >
                  <Upload className="w-4 h-4 mr-3" />
                  Novo projeto
                </Button>
              )}

              {isAdminAuthorized && (
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-500/70 hover:text-red-500 hover:bg-red-500/10"
                  onClick={() => { setCurrentView("admin"); setSidebarOpen(false); }}
                >
                  <Lock className="w-4 h-4 mr-3" />
                  Admin
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* VIEW: DASHBOARD */}
        {currentView === "dashboard" && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Bem-vindo ao <span style={{ color: currentTheme.primary }}>Eloid Studio</span>
              </h1>
              <p className="text-lg text-[#FFFFFF]/60 mb-8">
                Transforme vídeos longos em cortes virais com IA avançada
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button 
                  onClick={() => setCurrentView("upload")}
                  className="bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-[#0D0D0D] font-semibold px-8 py-6"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Novo Projeto
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setCurrentView("marketplace")}
                  className="border-[#1A1A1A] text-white hover:border-[#00E5FF]/30 hover:bg-[#00E5FF]/5 px-8 py-6"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Explorar Templates
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-[#00E5FF]/10 to-[#00E5FF]/5 border-[#00E5FF]/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-[#00E5FF]/20 rounded-xl flex items-center justify-center">
                    <FileVideo className="w-6 h-6 text-[#00E5FF]" />
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-0">+12%</Badge>
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">{analytics?.totalClips || 0}</h3>
                <p className="text-sm text-[#FFFFFF]/60">Clipes Gerados</p>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <Eye className="w-6 h-6 text-purple-400" />
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-0">+28%</Badge>
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">{analytics?.totalViews.toLocaleString() || 0}</h3>
                <p className="text-sm text-[#FFFFFF]/60">Visualizações Totais</p>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-500/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-orange-400" />
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-0">+8%</Badge>
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">{analytics?.avgEngagement.toFixed(1) || 0}%</h3>
                <p className="text-sm text-[#FFFFFF]/60">Engajamento Médio</p>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-green-400" />
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-0">Ativo</Badge>
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">98%</h3>
                <p className="text-sm text-[#FFFFFF]/60">Performance IA</p>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-6 hover:border-[#00E5FF]/30 transition-all cursor-pointer" onClick={() => setCurrentView("upload")}>
                <div className="w-12 h-12 bg-[#00E5FF]/10 rounded-xl flex items-center justify-center mb-4">
                  <Upload className="w-6 h-6 text-[#00E5FF]" />
                </div>
                <h3 className="text-white font-semibold mb-2">Upload de Vídeo</h3>
                <p className="text-sm text-[#FFFFFF]/60 mb-4">Faça upload de um novo vídeo e gere clipes automaticamente</p>
                <Button variant="ghost" size="sm" className="text-[#00E5FF] hover:text-[#00E5FF] hover:bg-[#00E5FF]/10 p-0">
                  Começar <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Card>

              <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-6 hover:border-[#00E5FF]/30 transition-all cursor-pointer" onClick={() => setCurrentView("batch")}>
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4">
                  <Layers className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Processamento em Lote</h3>
                <p className="text-sm text-[#FFFFFF]/60 mb-4">Processe múltiplos vídeos simultaneamente</p>
                <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-400 hover:bg-purple-500/10 p-0">
                  Acessar <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Card>

              <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-6 hover:border-[#00E5FF]/30 transition-all cursor-pointer" onClick={() => setCurrentView("analytics")}>
                <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Analytics Detalhado</h3>
                <p className="text-sm text-[#FFFFFF]/60 mb-4">Visualize métricas e performance dos seus clipes</p>
                <Button variant="ghost" size="sm" className="text-orange-400 hover:text-orange-400 hover:bg-orange-500/10 p-0">
                  Ver Dados <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Card>
            </div>

            {/* Recent Activity & Trending */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-semibold text-lg">Atividade Recente</h3>
                  <Button variant="ghost" size="sm" className="text-[#00E5FF] hover:text-[#00E5FF]">
                    Ver tudo
                  </Button>
                </div>
                <div className="space-y-4">
                  {[
                    { icon: FileVideo, title: "Vídeo processado", desc: "Marketing_Video.mp4", time: "2 min atrás", color: "text-[#00E5FF]" },
                    { icon: Download, title: "Clipes exportados", desc: "6 clipes em HD", time: "15 min atrás", color: "text-green-400" },
                    { icon: ShoppingBag, title: "Template adquirido", desc: "Viral Shorts Pack Pro", time: "1 hora atrás", color: "text-purple-400" },
                    { icon: Users2, title: "Colaborador adicionado", desc: "maria@email.com", time: "3 horas atrás", color: "text-orange-400" }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-[#1A1A1A]/50 transition-colors">
                      <div className={`w-10 h-10 ${activity.color.replace('text-', 'bg-')}/10 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <activity.icon className={`w-5 h-5 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm">{activity.title}</p>
                        <p className="text-[#FFFFFF]/60 text-xs truncate">{activity.desc}</p>
                      </div>
                      <span className="text-[#FFFFFF]/40 text-xs whitespace-nowrap">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-semibold text-lg">Trending Templates</h3>
                  <Button variant="ghost" size="sm" className="text-[#00E5FF] hover:text-[#00E5FF]" onClick={() => setCurrentView("marketplace")}>
                    Ver todos
                  </Button>
                </div>
                <div className="space-y-4">
                  {templates.filter(t => t.isBestseller).slice(0, 3).map((template, index) => (
                    <div key={template.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#1A1A1A]/50 transition-colors cursor-pointer">
                      <div className={`w-16 h-16 bg-gradient-to-br from-[#00E5FF]/20 to-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Crown className="w-8 h-8 text-[#00E5FF]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm truncate">{template.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-[#FFFFFF]/60">{template.rating}</span>
                          </div>
                          <span className="text-[#FFFFFF]/40">•</span>
                          <span className="text-xs text-[#FFFFFF]/60">{template.downloads} downloads</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[#00E5FF] font-semibold">R$ {template.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Tips Section */}
            <Card className="bg-gradient-to-br from-[#00E5FF]/5 to-purple-500/5 border-[#00E5FF]/20 p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#00E5FF]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-[#00E5FF]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg mb-2">Dica do Dia</h3>
                  <p className="text-[#FFFFFF]/70 mb-4">
                    Use palavras-chave específicas do seu nicho para melhorar a precisão da IA em até 40%. Experimente combinar termos técnicos com emocionais para resultados ainda melhores!
                  </p>
                  <Button variant="outline" size="sm" className="border-[#00E5FF]/30 text-[#00E5FF] hover:bg-[#00E5FF]/10">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Ver mais dicas
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* VIEW: UPLOAD */}
        {currentView === "upload" && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Transforme vídeos longos em <span style={{ color: currentTheme.primary }}>cortes virais</span>
              </h1>
              <p className="text-lg text-[#FFFFFF]/60">
                IA avançada que identifica os melhores momentos automaticamente
              </p>
            </div>

            <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-8">
              <Tabs defaultValue="file" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="file">Upload de arquivo</TabsTrigger>
                  <TabsTrigger value="url">Link do vídeo</TabsTrigger>
                </TabsList>

                <TabsContent value="file" className="space-y-6">
                  <div className="border-2 border-dashed border-[#1A1A1A] rounded-2xl p-12 text-center hover:border-[#00E5FF]/30 transition-all duration-300">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="w-20 h-20 bg-[#00E5FF]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Upload className="w-10 h-10 text-[#00E5FF]" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Arraste seu vídeo aqui
                      </h3>
                      <p className="text-[#FFFFFF]/60 mb-4">
                        ou clique para selecionar
                      </p>
                      <p className="text-sm text-[#FFFFFF]/40">
                        Suporta MP4, MOV, AVI até 2GB
                      </p>
                    </label>
                  </div>
                </TabsContent>

                <TabsContent value="url" className="space-y-6">
                  <div>
                    <Label className="text-white mb-3 block">Cole o link do vídeo</Label>
                    <Input
                      placeholder="https://youtube.com/watch?v=..."
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      className="bg-[#0D0D0D] border-[#1A1A1A] text-white mb-2"
                    />
                    {urlError && (
                      <p className="text-red-500 text-sm mt-2">{urlError}</p>
                    )}
                    <p className="text-xs text-[#FFFFFF]/40 mt-2">
                      Suporta: YouTube, Vimeo, Facebook, Instagram, TikTok, Twitch, Dailymotion
                    </p>
                  </div>
                  <Button
                    onClick={handleUrlUpload}
                    className="w-full bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-[#0D0D0D] font-semibold py-6"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Processar vídeo
                  </Button>
                </TabsContent>
              </Tabs>

              {processing && (
                <div className="mt-8 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#FFFFFF]/60">
                      {analyzingContext ? "Analisando contexto com IA..." : "Processando vídeo..."}
                    </span>
                    <span className="text-[#00E5FF] font-semibold">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
            </Card>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-6">
                <div className="w-12 h-12 bg-[#00E5FF]/10 rounded-xl flex items-center justify-center mb-4">
                  <Wand2 className="w-6 h-6 text-[#00E5FF]" />
                </div>
                <h3 className="text-white font-semibold mb-2">IA Contextual</h3>
                <p className="text-sm text-[#FFFFFF]/60">
                  Entende o contexto e identifica os momentos mais impactantes
                </p>
              </Card>

              <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-6">
                <div className="w-12 h-12 bg-[#00E5FF]/10 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-[#00E5FF]" />
                </div>
                <h3 className="text-white font-semibold mb-2">Processamento Rápido</h3>
                <p className="text-sm text-[#FFFFFF]/60">
                  Gere múltiplos clipes em segundos com nossa tecnologia otimizada
                </p>
              </Card>

              <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-6">
                <div className="w-12 h-12 bg-[#00E5FF]/10 rounded-xl flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-[#00E5FF]" />
                </div>
                <h3 className="text-white font-semibold mb-2">Alta Precisão</h3>
                <p className="text-sm text-[#FFFFFF]/60">
                  Score de relevância para cada clipe baseado em análise avançada
                </p>
              </Card>
            </div>
          </div>
        )}

        {/* VIEW: PREVIEW */}
        {currentView === "preview" && clips.length > 0 && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Clipes Gerados</h2>
                <p className="text-[#FFFFFF]/60">{clips.length} clipes encontrados • {selectedClipsCount} selecionados</p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setCurrentView("upload")}
                  className="border-[#1A1A1A] text-white hover:border-[#00E5FF]/30"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Novo vídeo
                </Button>
                <Button
                  onClick={handleExportClips}
                  disabled={selectedClipsCount === 0}
                  className="bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-[#0D0D0D] font-semibold"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exportar ({selectedClipsCount})
                </Button>
              </div>
            </div>

            {/* Controles de personalização */}
            <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-6">
              <h3 className="text-white font-semibold mb-4">Personalizar com Palavras-chave</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <Input
                    placeholder="Digite palavras-chave separadas por vírgula..."
                    value={customKeywords}
                    onChange={(e) => setCustomKeywords(e.target.value)}
                    className="bg-[#0D0D0D] border-[#1A1A1A] text-white"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={keywordMode} onValueChange={(value: KeywordMode) => setKeywordMode(value)}>
                    <SelectTrigger className="bg-[#0D0D0D] border-[#1A1A1A] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0D0D0D] border-[#1A1A1A]">
                      <SelectItem value="replace" className="text-white">Substituir</SelectItem>
                      <SelectItem value="add" className="text-white">Adicionar</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={handleRegenerateByKeywords}
                    disabled={!customKeywords.trim()}
                    className="bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-[#0D0D0D]"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Regenerar
                  </Button>
                </div>
              </div>
            </Card>

            {/* Grid de clipes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clips.map((clip) => (
                <Card
                  key={clip.id}
                  className={`bg-[#0D0D0D] border-[#1A1A1A] overflow-hidden hover:border-[#00E5FF]/30 transition-all cursor-pointer ${
                    clip.selected ? 'ring-2 ring-[#00E5FF]' : ''
                  }`}
                  onClick={() => handleToggleClipSelection(clip.id)}
                >
                  <div className={`h-48 bg-gradient-to-br from-[#00E5FF]/20 to-purple-500/20 flex items-center justify-center relative`}>
                    <Play className="w-16 h-16 text-white/80" />
                    {clip.aiSuggested && (
                      <Badge className="absolute top-3 left-3 bg-[#00E5FF] text-[#0D0D0D] border-0">
                        <Sparkles className="w-3 h-3 mr-1" />
                        IA Sugerido
                      </Badge>
                    )}
                    {clip.selected && (
                      <div className="absolute top-3 right-3 w-6 h-6 bg-[#00E5FF] rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-[#0D0D0D]" />
                      </div>
                    )}
                    <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 rounded text-xs text-white">
                      {clip.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2 line-clamp-2">{clip.title}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4 text-[#00E5FF]" />
                        <span className="text-sm text-[#00E5FF] font-semibold">{clip.score}%</span>
                      </div>
                      <span className="text-[#FFFFFF]/40">•</span>
                      <span className="text-sm text-[#FFFFFF]/60">{clip.format}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {clip.keywords.slice(0, 3).map((keyword, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs border-[#00E5FF]/30 text-[#00E5FF]">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                    {clip.engagement && (
                      <div className="flex items-center gap-4 text-xs text-[#FFFFFF]/60 pt-3 border-t border-[#1A1A1A]">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {(clip.engagement.views / 1000).toFixed(1)}k
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {clip.engagement.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          {clip.engagement.comments}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: EXPORT */}
        {currentView === "export" && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Exportar Clipes</h2>
              <p className="text-[#FFFFFF]/60">Configure as opções de exportação</p>
            </div>

            <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-8">
              <div className="space-y-6">
                <div>
                  <Label className="text-white mb-3 block">Qualidade</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {(["720p", "1080p", "4K"] as QualityOption[]).map((q) => (
                      <Button
                        key={q}
                        variant={quality === q ? "default" : "outline"}
                        onClick={() => handleBatchQualityChange(q)}
                        className={quality === q ? "bg-[#00E5FF] text-[#0D0D0D]" : "border-[#1A1A1A] text-white"}
                      >
                        {q}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-white mb-3 block">Formato</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {(["9:16", "1:1", "16:9"] as FormatOption[]).map((format) => (
                      <Button
                        key={format}
                        variant={aspectRatio === format ? "default" : "outline"}
                        onClick={() => handleBatchFormatChange(format)}
                        className={aspectRatio === format ? "bg-[#00E5FF] text-[#0D0D0D]" : "border-[#1A1A1A] text-white"}
                      >
                        {format}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-white mb-3 block">Plataforma</Label>
                  <Select value={exportFormat} onValueChange={(value: ExportFormat) => setExportFormat(value)}>
                    <SelectTrigger className="bg-[#0D0D0D] border-[#1A1A1A] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0D0D0D] border-[#1A1A1A]">
                      <SelectItem value="Reels" className="text-white">Instagram Reels</SelectItem>
                      <SelectItem value="Shorts" className="text-white">YouTube Shorts</SelectItem>
                      <SelectItem value="TikTok" className="text-white">TikTok</SelectItem>
                      <SelectItem value="Feed" className="text-white">Feed</SelectItem>
                      <SelectItem value="YouTube" className="text-white">YouTube</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {isExporting && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#FFFFFF]/60">Exportando...</span>
                      <span className="text-[#00E5FF] font-semibold">{exportProgress}%</span>
                    </div>
                    <Progress value={exportProgress} className="h-2" />
                  </div>
                )}

                <Button
                  onClick={handleExportClips}
                  disabled={isExporting}
                  className="w-full bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-[#0D0D0D] font-semibold py-6"
                >
                  <Download className="w-5 h-5 mr-2" />
                  {isExporting ? 'Exportando...' : `Exportar ${selectedClipsCount} clipes`}
                </Button>
              </div>
            </Card>

            {/* Compartilhamento rápido */}
            <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-6">
              <h3 className="text-white font-semibold mb-4">Compartilhar Diretamente</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleShareToSocial("Instagram")}
                  className="border-[#1A1A1A] text-white hover:border-pink-500/30 hover:bg-pink-500/10"
                >
                  <Instagram className="w-5 h-5 mr-2" />
                  Instagram
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleShareToSocial("YouTube")}
                  className="border-[#1A1A1A] text-white hover:border-red-500/30 hover:bg-red-500/10"
                >
                  <Youtube className="w-5 h-5 mr-2" />
                  YouTube
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleShareToSocial("TikTok")}
                  className="border-[#1A1A1A] text-white hover:border-[#00E5FF]/30 hover:bg-[#00E5FF]/10"
                >
                  <Video className="w-5 h-5 mr-2" />
                  TikTok
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleShareToSocial("Facebook")}
                  className="border-[#1A1A1A] text-white hover:border-blue-500/30 hover:bg-blue-500/10"
                >
                  <Facebook className="w-5 h-5 mr-2" />
                  Facebook
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* VIEW: ANALYTICS */}
        {currentView === "analytics" && analytics && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Analytics</h2>
                <p className="text-[#FFFFFF]/60">Métricas detalhadas dos seus clipes</p>
              </div>
              <div className="flex gap-3">
                <Select value={timeRange} onValueChange={(value: "7d" | "30d" | "90d") => setTimeRange(value)}>
                  <SelectTrigger className="w-[140px] bg-[#0D0D0D] border-[#1A1A1A] text-white">
                    <Calendar className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D0D0D] border-[#1A1A1A]">
                    <SelectItem value="7d" className="text-white">Últimos 7 dias</SelectItem>
                    <SelectItem value="30d" className="text-white">Últimos 30 dias</SelectItem>
                    <SelectItem value="90d" className="text-white">Últimos 90 dias</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="border-[#1A1A1A] text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar Relatório
                </Button>
              </div>
            </div>

            {/* Tabs de visualização */}
            <Tabs value={metricsView} onValueChange={(value: "overview" | "detailed" | "trends") => setMetricsView(value)}>
              <TabsList className="grid w-full grid-cols-3 max-w-md">
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="detailed">Detalhado</TabsTrigger>
                <TabsTrigger value="trends">Tendências</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Stats principais */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-6">
                    <div className="flex items-center justify-between mb-4">
                      <FileVideo className="w-8 h-8 text-[#00E5FF]" />
                      <Badge className="bg-green-500/20 text-green-400 border-0">+12%</Badge>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-1">{analytics.totalClips}</h3>
                    <p className="text-sm text-[#FFFFFF]/60">Total de Clipes</p>
                  </Card>

                  <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Eye className="w-8 h-8 text-purple-400" />
                      <Badge className="bg-green-500/20 text-green-400 border-0">+28%</Badge>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-1">{analytics.totalViews.toLocaleString()}</h3>
                    <p className="text-sm text-[#FFFFFF]/60">Visualizações</p>
                  </Card>

                  <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-6">
                    <div className="flex items-center justify-between mb-4">
                      <TrendingUp className="w-8 h-8 text-orange-400" />
                      <Badge className="bg-green-500/20 text-green-400 border-0">+8%</Badge>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-1">{analytics.avgEngagement.toFixed(1)}%</h3>
                    <p className="text-sm text-[#FFFFFF]/60">Engajamento Médio</p>
                  </Card>

                  <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Target className="w-8 h-8 text-green-400" />
                      <Badge className="bg-green-500/20 text-green-400 border-0">Ótimo</Badge>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-1">91%</h3>
                    <p className="text-sm text-[#FFFFFF]/60">Score Médio</p>
                  </Card>
                </div>

                {/* Performance por formato */}
                <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-6">
                  <h3 className="text-white font-semibold mb-6">Performance por Formato</h3>
                  <div className="space-y-4">
                    {analytics.performanceByFormat.map((item) => (
                      <div key={item.format}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium">{item.format}</span>
                          <span className="text-[#00E5FF] font-semibold">{item.avgScore}%</span>
                        </div>
                        <Progress value={item.avgScore} className="h-2" />
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Top Keywords */}
                <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-6">
                  <h3 className="text-white font-semibold mb-4">Palavras-chave Mais Efetivas</h3>
                  <div className="flex flex-wrap gap-2">
                    {analytics.topKeywords.map((keyword, index) => (
                      <Badge
                        key={index}
                        className="bg-[#00E5FF]/10 text-[#00E5FF] border-[#00E5FF]/30 px-4 py-2 text-sm"
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="detailed" className="space-y-6">
                <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-6">
                  <h3 className="text-white font-semibold mb-6">Análise Detalhada por Clipe</h3>
                  <div className="space-y-4">
                    {clips.slice(0, 5).map((clip) => (
                      <div key={clip.id} className="flex items-center gap-4 p-4 rounded-lg bg-[#1A1A1A]/30">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#00E5FF]/20 to-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Play className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium truncate">{clip.title}</p>
                          <div className="flex items-center gap-4 mt-1 text-sm text-[#FFFFFF]/60">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {clip.engagement?.views.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              {clip.engagement?.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="w-3 h-3" />
                              {clip.engagement?.comments}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-[#00E5FF]">{clip.score}%</div>
                          <div className="text-xs text-[#FFFFFF]/60">Score</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="trends" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-6">
                    <h3 className="text-white font-semibold mb-4">Crescimento de Visualizações</h3>
                    <div className="h-64 flex items-end justify-between gap-2">
                      {[45, 62, 58, 73, 81, 76, 89].map((height, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center gap-2">
                          <div
                            className="w-full bg-gradient-to-t from-[#00E5FF] to-[#00E5FF]/50 rounded-t"
                            style={{ height: `${height}%` }}
                          />
                          <span className="text-xs text-[#FFFFFF]/60">D{index + 1}</span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-6">
                    <h3 className="text-white font-semibold mb-4">Taxa de Engajamento</h3>
                    <div className="h-64 flex items-end justify-between gap-2">
                      {[52, 68, 71, 65, 78, 82, 88].map((height, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center gap-2">
                          <div
                            className="w-full bg-gradient-to-t from-purple-500 to-purple-500/50 rounded-t"
                            style={{ height: `${height}%` }}
                          />
                          <span className="text-xs text-[#FFFFFF]/60">D{index + 1}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* VIEW: BATCH */}
        {currentView === "batch" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Processamento em Lote</h2>
                <p className="text-[#FFFFFF]/60">Processe múltiplos vídeos simultaneamente</p>
              </div>
            </div>

            <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-8">
              <div className="border-2 border-dashed border-[#1A1A1A] rounded-2xl p-12 text-center hover:border-[#00E5FF]/30 transition-all duration-300">
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={(e) => e.target.files && handleBatchUpload(e.target.files)}
                  className="hidden"
                  id="batch-upload"
                />
                <label htmlFor="batch-upload" className="cursor-pointer">
                  <div className="w-20 h-20 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Layers className="w-10 h-10 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Adicionar múltiplos vídeos
                  </h3>
                  <p className="text-[#FFFFFF]/60 mb-4">
                    Selecione vários arquivos para processar em lote
                  </p>
                  <p className="text-sm text-[#FFFFFF]/40">
                    Suporta até 10 vídeos simultaneamente
                  </p>
                </label>
              </div>
            </Card>

            {batchProjects.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-white font-semibold text-lg">Projetos em Processamento</h3>
                {batchProjects.map((project) => (
                  <Card key={project.id} className="bg-[#0D0D0D] border-[#1A1A1A] p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          project.status === "completed" ? "bg-green-500/10" :
                          project.status === "processing" ? "bg-[#00E5FF]/10" :
                          "bg-[#FFFFFF]/10"
                        }`}>
                          {project.status === "completed" ? (
                            <CheckCircle2 className="w-6 h-6 text-green-400" />
                          ) : project.status === "processing" ? (
                            <RefreshCw className="w-6 h-6 text-[#00E5FF] animate-spin" />
                          ) : (
                            <Clock className="w-6 h-6 text-[#FFFFFF]/60" />
                          )}
                        </div>
                        <div>
                          <p className="text-white font-medium">{project.name}</p>
                          <p className="text-sm text-[#FFFFFF]/60">
                            {project.status === "completed" ? `${project.clipsGenerated} clipes gerados` :
                             project.status === "processing" ? "Processando..." :
                             "Na fila"}
                          </p>
                        </div>
                      </div>
                      <Badge className={
                        project.status === "completed" ? "bg-green-500/20 text-green-400 border-0" :
                        project.status === "processing" ? "bg-[#00E5FF]/20 text-[#00E5FF] border-0" :
                        "bg-[#FFFFFF]/10 text-[#FFFFFF]/60 border-0"
                      }>
                        {project.status === "completed" ? "Concluído" :
                         project.status === "processing" ? "Processando" :
                         "Pendente"}
                      </Badge>
                    </div>
                    {project.status !== "pending" && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[#FFFFFF]/60">Progresso</span>
                          <span className="text-[#00E5FF] font-semibold">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW: MARKETPLACE */}
        {currentView === "marketplace" && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-2">Marketplace de Templates</h2>
              <p className="text-lg text-[#FFFFFF]/60">Templates profissionais para acelerar sua criação</p>
            </div>

            {/* Busca e Filtros */}
            <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#FFFFFF]/40" />
                    <Input
                      placeholder="Buscar templates..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-[#0D0D0D] border-[#1A1A1A] text-white pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-[#0D0D0D] border-[#1A1A1A] text-white">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D0D0D] border-[#1A1A1A]">
                    <SelectItem value="all" className="text-white">Todas</SelectItem>
                    <SelectItem value="youtube" className="text-white">YouTube</SelectItem>
                    <SelectItem value="instagram" className="text-white">Instagram</SelectItem>
                    <SelectItem value="tiktok" className="text-white">TikTok</SelectItem>
                    <SelectItem value="business" className="text-white">Business</SelectItem>
                    <SelectItem value="starter" className="text-white">Starter</SelectItem>
                    <SelectItem value="premium" className="text-white">Premium</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger className="bg-[#0D0D0D] border-[#1A1A1A] text-white">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Preço" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D0D0D] border-[#1A1A1A]">
                    <SelectItem value="all" className="text-white">Todos</SelectItem>
                    <SelectItem value="free" className="text-white">Grátis</SelectItem>
                    <SelectItem value="low" className="text-white">Até R$ 100</SelectItem>
                    <SelectItem value="medium" className="text-white">R$ 100 - R$ 200</SelectItem>
                    <SelectItem value="high" className="text-white">Acima de R$ 200</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-[#FFFFFF]/60">{filteredTemplates.length} templates encontrados</p>
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={viewMode === "grid" ? "bg-[#00E5FF] text-[#0D0D0D]" : "text-[#FFFFFF]/60"}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={viewMode === "list" ? "bg-[#00E5FF] text-[#0D0D0D]" : "text-[#FFFFFF]/60"}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Grid de Templates */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredTemplates.map((template) => (
                <Card
                  key={template.id}
                  className="bg-[#0D0D0D] border-[#1A1A1A] overflow-hidden hover:border-[#00E5FF]/30 transition-all group cursor-pointer"
                >
                  <div className="relative h-48 bg-gradient-to-br from-[#00E5FF]/20 via-purple-500/20 to-orange-500/20 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                    <Package className="w-16 h-16 text-white/80 relative z-10" />
                    {template.isBestseller && (
                      <Badge className="absolute top-3 left-3 bg-yellow-500 text-black border-0 font-semibold">
                        <Crown className="w-3 h-3 mr-1" />
                        Mais Vendido
                      </Badge>
                    )}
                    {template.isNew && (
                      <Badge className="absolute top-3 right-3 bg-[#00E5FF] text-[#0D0D0D] border-0 font-semibold">
                        Novo
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(template.id)}
                      className="absolute bottom-3 right-3 bg-black/60 hover:bg-black/80"
                    >
                      {favorites.includes(template.id) ? (
                        <BookmarkCheck className="w-4 h-4 text-[#00E5FF]" />
                      ) : (
                        <Bookmark className="w-4 h-4 text-white" />
                      )}
                    </Button>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold mb-1 line-clamp-1">{template.name}</h3>
                        <p className="text-sm text-[#FFFFFF]/60 mb-2">por {template.author}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#00E5FF]">R$ {template.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <p className="text-sm text-[#FFFFFF]/60 mb-4 line-clamp-2">{template.description}</p>
                    <div className="flex items-center gap-4 mb-4 text-sm text-[#FFFFFF]/60">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-white">{template.rating}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        <span>{template.downloads.toLocaleString()}</span>
                      </div>
                    </div>
                    {template.features && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {template.features.slice(0, 3).map((feature, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs border-[#00E5FF]/30 text-[#00E5FF]">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-[#0D0D0D] font-semibold">
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Comprar
                      </Button>
                      <Button variant="outline" className="border-[#1A1A1A] text-white hover:border-[#00E5FF]/30">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: RESOURCES */}
        {currentView === "resources" && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-2">Recursos Educacionais</h2>
              <p className="text-lg text-[#FFFFFF]/60">Aprenda a criar conteúdo viral com nossos materiais</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource) => (
                <Card key={resource.id} className="bg-[#0D0D0D] border-[#1A1A1A] overflow-hidden hover:border-[#00E5FF]/30 transition-all group cursor-pointer">
                  <div className="relative h-48 bg-gradient-to-br from-purple-500/20 to-orange-500/20 flex items-center justify-center">
                    {resource.type === "video" && <Video className="w-16 h-16 text-white/80" />}
                    {resource.type === "article" && <FileText className="w-16 h-16 text-white/80" />}
                    {resource.type === "webinar" && <Users className="w-16 h-16 text-white/80" />}
                    <div className="absolute bottom-3 right-3 bg-black/80 px-3 py-1 rounded text-sm text-white">
                      {resource.duration}
                    </div>
                    <Badge className="absolute top-3 left-3 bg-purple-500/20 text-purple-300 border-purple-500/30">
                      {resource.category}
                    </Badge>
                  </div>
                  <div className="p-6">
                    <h3 className="text-white font-semibold mb-4 line-clamp-2">{resource.title}</h3>
                    <Button className="w-full bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-[#0D0D0D] font-semibold">
                      <Play className="w-4 h-4 mr-2" />
                      {resource.type === "video" ? "Assistir" : resource.type === "article" ? "Ler" : "Participar"}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Seção de dicas */}
            <Card className="bg-gradient-to-br from-[#00E5FF]/5 to-purple-500/5 border-[#00E5FF]/20 p-8">
              <h3 className="text-white font-semibold text-xl mb-6">Dicas para Criar Conteúdo Viral</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: Target, title: "Foque no Hook", desc: "Os primeiros 3 segundos são cruciais para prender a atenção" },
                  { icon: Zap, title: "Ritmo Acelerado", desc: "Mantenha cortes rápidos e dinâmicos para manter o engajamento" },
                  { icon: MessageCircle, title: "Call to Action", desc: "Sempre inclua um CTA claro no final do vídeo" },
                  { icon: TrendingUp, title: "Tendências", desc: "Acompanhe e adapte trends do momento para seu nicho" }
                ].map((tip, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#00E5FF]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <tip.icon className="w-6 h-6 text-[#00E5FF]" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{tip.title}</h4>
                      <p className="text-sm text-[#FFFFFF]/60">{tip.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* VIEW: COLLABORATE */}
        {currentView === "collaborate" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Colaboração</h2>
                <p className="text-[#FFFFFF]/60">Trabalhe em equipe nos seus projetos</p>
              </div>
            </div>

            <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-6">
              <h3 className="text-white font-semibold mb-4">Adicionar Colaborador</h3>
              <div className="flex gap-3">
                <Input
                  placeholder="email@exemplo.com"
                  value={newCollaboratorEmail}
                  onChange={(e) => setNewCollaboratorEmail(e.target.value)}
                  className="bg-[#0D0D0D] border-[#1A1A1A] text-white"
                />
                <Button
                  onClick={handleAddCollaborator}
                  className="bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-[#0D0D0D] font-semibold"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Convidar
                </Button>
              </div>
            </Card>

            {collaborators.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collaborators.map((collab) => (
                  <Card key={collab.id} className="bg-[#0D0D0D] border-[#1A1A1A] p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#00E5FF]/20 to-purple-500/20 rounded-full flex items-center justify-center">
                        <Users2 className="w-6 h-6 text-[#00E5FF]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold">{collab.name}</p>
                        <p className="text-sm text-[#FFFFFF]/60">{collab.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className={collab.role === "editor" ? "bg-[#00E5FF]/20 text-[#00E5FF] border-0" : "bg-[#FFFFFF]/10 text-[#FFFFFF]/60 border-0"}>
                        {collab.role === "editor" ? "Editor" : "Visualizador"}
                      </Badge>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-400 hover:bg-red-500/10">
                        <UserMinus className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-12 text-center">
                <div className="w-16 h-16 bg-[#FFFFFF]/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users2 className="w-8 h-8 text-[#FFFFFF]/40" />
                </div>
                <h3 className="text-white font-semibold mb-2">Nenhum colaborador ainda</h3>
                <p className="text-[#FFFFFF]/60">Convide membros da equipe para trabalhar juntos</p>
              </Card>
            )}

            {/* Permissões */}
            <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-6">
              <h3 className="text-white font-semibold mb-4">Níveis de Permissão</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-[#1A1A1A]/30">
                  <div className="w-10 h-10 bg-[#00E5FF]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Edit3 className="w-5 h-5 text-[#00E5FF]" />
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">Editor</p>
                    <p className="text-sm text-[#FFFFFF]/60">Pode criar, editar e excluir projetos e clipes</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-[#1A1A1A]/30">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Eye className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">Visualizador</p>
                    <p className="text-sm text-[#FFFFFF]/60">Pode apenas visualizar projetos e fazer comentários</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* VIEW: AFFILIATES */}
        {currentView === "affiliates" && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-2">Programa de Afiliados</h2>
              <p className="text-lg text-[#FFFFFF]/60">Ganhe 30% de comissão em cada venda</p>
            </div>

            {!affiliateData ? (
              <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-8 max-w-2xl mx-auto">
                <h3 className="text-white font-semibold text-xl mb-6">Inscreva-se no Programa</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-white mb-2 block">Nome Completo *</Label>
                    <Input
                      placeholder="Seu nome"
                      value={affiliateName}
                      onChange={(e) => setAffiliateName(e.target.value)}
                      className="bg-[#0D0D0D] border-[#1A1A1A] text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white mb-2 block">E-mail *</Label>
                    <Input
                      type="email"
                      placeholder="seu@email.com"
                      value={affiliateEmail}
                      onChange={(e) => setAffiliateEmail(e.target.value)}
                      className="bg-[#0D0D0D] border-[#1A1A1A] text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white mb-2 block">Telefone</Label>
                    <Input
                      placeholder="(00) 00000-0000"
                      value={affiliatePhone}
                      onChange={(e) => setAffiliatePhone(e.target.value)}
                      className="bg-[#0D0D0D] border-[#1A1A1A] text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white mb-2 block">Experiência com Marketing Digital</Label>
                    <Textarea
                      placeholder="Conte um pouco sobre sua experiência..."
                      value={affiliateExperience}
                      onChange={(e) => setAffiliateExperience(e.target.value)}
                      className="bg-[#0D0D0D] border-[#1A1A1A] text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white mb-2 block">Redes Sociais</Label>
                    <Input
                      placeholder="Links das suas redes sociais"
                      value={affiliateSocial}
                      onChange={(e) => setAffiliateSocial(e.target.value)}
                      className="bg-[#0D0D0D] border-[#1A1A1A] text-white"
                    />
                  </div>
                  <Button
                    onClick={handleAffiliateSubmit}
                    className="w-full bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-[#0D0D0D] font-semibold py-6"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Enviar Solicitação
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Stats do Afiliado */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-6">
                    <div className="flex items-center justify-between mb-4">
                      <DollarSign className="w-8 h-8 text-green-400" />
                      <Badge className="bg-green-500/20 text-green-400 border-0">Ativo</Badge>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-1">R$ {affiliateData.earnings.toFixed(2)}</h3>
                    <p className="text-sm text-[#FFFFFF]/60">Ganhos Totais</p>
                  </Card>

                  <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-6">
                    <div className="flex items-center justify-between mb-4">
                      <ShoppingBag className="w-8 h-8 text-[#00E5FF]" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-1">{affiliateData.sales}</h3>
                    <p className="text-sm text-[#FFFFFF]/60">Vendas Realizadas</p>
                  </Card>

                  <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-6">
                    <div className="flex items-center justify-between mb-4">
                      <TrendingUp className="w-8 h-8 text-purple-400" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-1">{affiliateData.commission}%</h3>
                    <p className="text-sm text-[#FFFFFF]/60">Comissão</p>
                  </Card>
                </div>

                {/* Link de Afiliado */}
                <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-6">
                  <h3 className="text-white font-semibold mb-4">Seu Link de Afiliado</h3>
                  <div className="flex gap-3">
                    <Input
                      value={affiliateData.affiliateLink}
                      readOnly
                      className="bg-[#0D0D0D] border-[#1A1A1A] text-white"
                    />
                    <Button
                      onClick={copyAffiliateLink}
                      className="bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-[#0D0D0D] font-semibold"
                    >
                      {affiliateLinkCopied ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copiar
                        </>
                      )}
                    </Button>
                  </div>
                </Card>

                {/* Materiais de Marketing */}
                <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-6">
                  <h3 className="text-white font-semibold mb-4">Materiais de Marketing</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="border-[#1A1A1A] text-white hover:border-[#00E5FF]/30 justify-start">
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Banners e Imagens
                    </Button>
                    <Button variant="outline" className="border-[#1A1A1A] text-white hover:border-[#00E5FF]/30 justify-start">
                      <FileText className="w-4 h-4 mr-2" />
                      Textos Prontos
                    </Button>
                    <Button variant="outline" className="border-[#1A1A1A] text-white hover:border-[#00E5FF]/30 justify-start">
                      <Video className="w-4 h-4 mr-2" />
                      Vídeos Promocionais
                    </Button>
                    <Button variant="outline" className="border-[#1A1A1A] text-white hover:border-[#00E5FF]/30 justify-start">
                      <Mail className="w-4 h-4 mr-2" />
                      Templates de E-mail
                    </Button>
                  </div>
                </Card>
              </div>
            )}

            {/* Benefícios */}
            <Card className="bg-gradient-to-br from-[#00E5FF]/5 to-purple-500/5 border-[#00E5FF]/20 p-8">
              <h3 className="text-white font-semibold text-xl mb-6">Por que se tornar um Afiliado?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: DollarSign, title: "30% de Comissão", desc: "Uma das maiores comissões do mercado" },
                  { icon: Zap, title: "Pagamentos Rápidos", desc: "Receba seus ganhos semanalmente" },
                  { icon: Rocket, title: "Materiais Prontos", desc: "Banners, vídeos e textos para divulgação" },
                  { icon: Users, title: "Suporte Dedicado", desc: "Equipe exclusiva para afiliados" }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#00E5FF]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-[#00E5FF]" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{benefit.title}</h4>
                      <p className="text-sm text-[#FFFFFF]/60">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* VIEW: SUPPORT */}
        {currentView === "support" && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-2">Central de Suporte</h2>
              <p className="text-lg text-[#FFFFFF]/60">Estamos aqui para ajudar você</p>
            </div>

            {!isSupportAuthorized ? (
              <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-8 max-w-md mx-auto">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-[#00E5FF]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-[#00E5FF]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Área Restrita</h3>
                  <p className="text-[#FFFFFF]/60">Insira o código de acesso para continuar</p>
                </div>
                <div className="space-y-4">
                  <Input
                    type="password"
                    placeholder="Código de acesso"
                    value={supportAccessCode}
                    onChange={(e) => setSupportAccessCode(e.target.value)}
                    className="bg-[#0D0D0D] border-[#1A1A1A] text-white"
                  />
                  <Button
                    onClick={handleSupportAccess}
                    className="w-full bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-[#0D0D0D] font-semibold py-6"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Acessar
                  </Button>
                  <p className="text-xs text-[#FFFFFF]/40 text-center">
                    Código: SUPPORT2024
                  </p>
                </div>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Criar Ticket */}
                <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-6">
                  <h3 className="text-white font-semibold mb-4">Abrir Novo Ticket</h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-white mb-2 block">Assunto</Label>
                      <Input
                        placeholder="Descreva brevemente o problema"
                        value={newTicketSubject}
                        onChange={(e) => setNewTicketSubject(e.target.value)}
                        className="bg-[#0D0D0D] border-[#1A1A1A] text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-white mb-2 block">Descrição</Label>
                      <Textarea
                        placeholder="Descreva o problema em detalhes..."
                        value={newTicketDescription}
                        onChange={(e) => setNewTicketDescription(e.target.value)}
                        className="bg-[#0D0D0D] border-[#1A1A1A] text-white min-h-[120px]"
                      />
                    </div>
                    <Button
                      onClick={handleSupportTicketSubmit}
                      className="w-full bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-[#0D0D0D] font-semibold"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Ticket
                    </Button>
                  </div>
                </Card>

                {/* Tickets Abertos */}
                {supportTickets.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-white font-semibold text-lg">Seus Tickets</h3>
                    {supportTickets.map((ticket) => (
                      <Card key={ticket.id} className="bg-[#0D0D0D] border-[#1A1A1A] p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h4 className="text-white font-semibold mb-1">{ticket.subject}</h4>
                            <p className="text-sm text-[#FFFFFF]/60">
                              Criado em {new Date(ticket.createdAt).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Badge className={
                              ticket.status === "resolved" ? "bg-green-500/20 text-green-400 border-0" :
                              ticket.status === "in-progress" ? "bg-[#00E5FF]/20 text-[#00E5FF] border-0" :
                              "bg-orange-500/20 text-orange-400 border-0"
                            }>
                              {ticket.status === "resolved" ? "Resolvido" :
                               ticket.status === "in-progress" ? "Em Andamento" :
                               "Aberto"}
                            </Badge>
                            <Badge className={
                              ticket.priority === "high" ? "bg-red-500/20 text-red-400 border-0" :
                              ticket.priority === "medium" ? "bg-orange-500/20 text-orange-400 border-0" :
                              "bg-[#FFFFFF]/10 text-[#FFFFFF]/60 border-0"
                            }>
                              {ticket.priority === "high" ? "Alta" :
                               ticket.priority === "medium" ? "Média" :
                               "Baixa"}
                            </Badge>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}

                {/* FAQ */}
                <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-6">
                  <h3 className="text-white font-semibold mb-4">Perguntas Frequentes</h3>
                  <div className="space-y-4">
                    {[
                      { q: "Como faço upload de um vídeo?", a: "Clique em 'Novo Projeto' e selecione o arquivo ou cole o link do vídeo." },
                      { q: "Qual o limite de tamanho dos vídeos?", a: "Você pode fazer upload de vídeos de até 2GB no plano gratuito." },
                      { q: "Como exporto meus clipes?", a: "Selecione os clipes desejados e clique em 'Exportar'. Escolha a qualidade e formato." },
                      { q: "Posso cancelar minha assinatura?", a: "Sim, você pode cancelar a qualquer momento nas configurações da conta." }
                    ].map((faq, index) => (
                      <div key={index} className="p-4 rounded-lg bg-[#1A1A1A]/30">
                        <h4 className="text-white font-semibold mb-2">{faq.q}</h4>
                        <p className="text-sm text-[#FFFFFF]/60">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}
          </div>
        )}

        {/* VIEW: ADMIN */}
        {currentView === "admin" && isAdminAuthorized && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Painel Administrativo</h2>
                <p className="text-[#FFFFFF]/60">Controle total do sistema</p>
              </div>
              <Badge className="bg-red-500/20 text-red-400 border-0 px-4 py-2">
                <Lock className="w-4 h-4 mr-2" />
                Área Restrita
              </Badge>
            </div>

            {/* Métricas do Sistema */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-[#0D0D0D] border-red-500/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">1,247</h3>
                <p className="text-sm text-[#FFFFFF]/60">Usuários Ativos</p>
              </Card>

              <Card className="bg-[#0D0D0D] border-red-500/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <FileVideo className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">8,932</h3>
                <p className="text-sm text-[#FFFFFF]/60">Vídeos Processados</p>
              </Card>

              <Card className="bg-[#0D0D0D] border-red-500/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <Database className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">2.4 TB</h3>
                <p className="text-sm text-[#FFFFFF]/60">Armazenamento Usado</p>
              </Card>

              <Card className="bg-[#0D0D0D] border-red-500/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <Activity className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">99.8%</h3>
                <p className="text-sm text-[#FFFFFF]/60">Uptime</p>
              </Card>
            </div>

            {/* Controles do Sistema */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-6">
                <h3 className="text-white font-semibold mb-4">Gerenciamento de Usuários</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start border-[#1A1A1A] text-white hover:border-red-500/30">
                    <Users className="w-4 h-4 mr-2" />
                    Ver Todos os Usuários
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-[#1A1A1A] text-white hover:border-red-500/30">
                    <UserCheck className="w-4 h-4 mr-2" />
                    Aprovar Afiliados
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-[#1A1A1A] text-white hover:border-red-500/30">
                    <Shield className="w-4 h-4 mr-2" />
                    Gerenciar Permissões
                  </Button>
                </div>
              </Card>

              <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-6">
                <h3 className="text-white font-semibold mb-4">Sistema</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start border-[#1A1A1A] text-white hover:border-red-500/30">
                    <Database className="w-4 h-4 mr-2" />
                    Backup do Banco
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-[#1A1A1A] text-white hover:border-red-500/30">
                    <Activity className="w-4 h-4 mr-2" />
                    Logs do Sistema
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-[#1A1A1A] text-white hover:border-red-500/30">
                    <Settings2 className="w-4 h-4 mr-2" />
                    Configurações Avançadas
                  </Button>
                </div>
              </Card>
            </div>

            {/* Performance do Sistema */}
            <Card className="bg-[#0D0D0D] border-[#1A1A1A] p-6">
              <h3 className="text-white font-semibold mb-6">Performance do Sistema</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white">CPU</span>
                    <span className="text-red-400 font-semibold">42%</span>
                  </div>
                  <Progress value={42} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white">Memória</span>
                    <span className="text-red-400 font-semibold">68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white">Disco</span>
                    <span className="text-red-400 font-semibold">54%</span>
                  </div>
                  <Progress value={54} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white">Rede</span>
                    <span className="text-red-400 font-semibold">31%</span>
                  </div>
                  <Progress value={31} className="h-2" />
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
