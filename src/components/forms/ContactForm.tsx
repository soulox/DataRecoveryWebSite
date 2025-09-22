'use client'

import React, { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, AlertCircle, Upload, X, FileText } from 'lucide-react'
import { trackContactFormSubmission } from '@/lib/analytics'
import { validateFiles } from '@/lib/file-storage'
import type { ContactFormData, ServiceType, UrgencyLevel } from '@/types'

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceType: 'data-recovery',
    urgency: 'medium',
    description: '',
    files: []
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<ContactFormData>>({})
  const [fileError, setFileError] = useState<string | undefined>(undefined)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const serviceTypes: { value: ServiceType; label: string }[] = [
    { value: 'data-recovery', label: 'Récupération de Données' },
    { value: 'sensitive-data-processing', label: 'Traitement des Données Sensibles' },
    { value: 'large-scale-data-management', label: 'Gestion des Données Volumineuses' },
    { value: 'emergency-recovery', label: 'Récupération d&apos;Urgence' },
    { value: 'consultation', label: 'Consultation' }
  ]

  const urgencyLevels: { value: UrgencyLevel; label: string; description: string }[] = [
    { value: 'low', label: 'Faible', description: 'Pas de pression temporelle' },
    { value: 'medium', label: 'Moyenne', description: 'Besoin dans les 2-3 jours' },
    { value: 'high', label: 'Élevée', description: 'Besoin dans les 24h' },
    { value: 'emergency', label: 'Critique', description: 'Intervention immédiate requise' }
  ]

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleFileUpload = (files: File[]) => {
    const validation = validateFiles(files)
    if (!validation.valid) {
      setFileError(validation.error)
      return
    }
    
    setFormData(prev => ({ ...prev, files: [...(prev.files || []), ...files] }))
    if (fileError) {
      setFileError(undefined)
    }
  }

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    handleFileUpload(files)
  }

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files?.filter((_, i) => i !== index) || []
    }))
  }

  // Drag and drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    handleFileUpload(files)
  }, [handleFileUpload])

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La description est requise'
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'La description doit contenir au moins 10 caractères'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Create FormData for file uploads
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone)
      if (formData.company) {
        formDataToSend.append('company', formData.company)
      }
      formDataToSend.append('serviceType', formData.serviceType)
      formDataToSend.append('urgency', formData.urgency)
      formDataToSend.append('description', formData.description)
      
      // Add files to FormData
      if (formData.files && formData.files.length > 0) {
        formData.files.forEach(file => {
          formDataToSend.append('files', file)
        })
      }

      // Send form data to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formDataToSend, // No Content-Type header needed for FormData
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        
        // Track form submission with analytics
        trackContactFormSubmission(formData.serviceType, formData.urgency)
        
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          serviceType: 'data-recovery',
          urgency: 'medium',
          description: '',
          files: []
        })
      } else {
        console.error('Form submission error:', result.message)
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
            <div>
              <h3 className="text-xl font-semibold text-green-800">
                Demande Envoyée avec Succès !
              </h3>
              <p className="text-green-700 mt-2">
                Merci pour votre demande. Notre équipe d&apos;experts vous contactera 
                dans les plus brefs délais pour évaluer vos besoins.
              </p>
            </div>
            <Button
              onClick={() => setSubmitStatus('idle')}
              variant="outline"
              className="border-green-300 text-green-700 hover:bg-green-100"
            >
              Nouvelle Demande
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Formulaire de Contact</CardTitle>
        <CardDescription>
          Remplissez tous les champs pour recevoir une évaluation personnalisée
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Votre nom complet"
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && (
                <p className="text-sm text-destructive flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="votre@email.com"
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && (
                <p className="text-sm text-destructive flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+33 1 23 45 67 89"
                className={errors.phone ? 'border-destructive' : ''}
              />
              {errors.phone && (
                <p className="text-sm text-destructive flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Entreprise (optionnel)</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="Nom de votre entreprise"
              />
            </div>
          </div>

          {/* Service Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="serviceType">Type de service *</Label>
              <Select
                value={formData.serviceType}
                onValueChange={(value: ServiceType) => handleInputChange('serviceType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un service" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map((service) => (
                    <SelectItem key={service.value} value={service.value}>
                      {service.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="urgency">Niveau d&apos;urgence *</Label>
              <Select
                value={formData.urgency}
                onValueChange={(value: UrgencyLevel) => handleInputChange('urgency', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez l'urgence" />
                </SelectTrigger>
                <SelectContent>
                  {urgencyLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      <div>
                        <div className="font-medium">{level.label}</div>
                        <div className="text-sm text-muted-foreground">{level.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description de votre situation *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Décrivez votre situation : type de données perdues, cause de la perte, volume de données, etc."
              rows={6}
              className={errors.description ? 'border-destructive' : ''}
            />
            {errors.description && (
              <p className="text-sm text-destructive flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.description}
              </p>
            )}
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="files">Fichiers joints (optionnel)</Label>
            <div 
              className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
                isDragOver 
                  ? 'border-primary bg-primary/5' 
                  : 'border-muted-foreground/25 hover:border-muted-foreground/50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="text-center space-y-4">
                <Upload className={`h-8 w-8 mx-auto ${isDragOver ? 'text-primary' : 'text-muted-foreground'}`} />
                <div>
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-primary hover:underline">
                      Cliquez pour télécharger
                    </span>
                    <span className="text-muted-foreground"> ou glissez-déposez vos fichiers</span>
                  </Label>
                  <input
                    ref={fileInputRef}
                    id="file-upload"
                    type="file"
                    multiple
                    onChange={handleFileInputChange}
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.txt"
                    aria-label="Télécharger des fichiers"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Formats acceptés : JPG, PNG, PDF, DOC, DOCX, TXT (max 10MB par fichier, 5 fichiers max)
                </p>
                {isDragOver && (
                  <p className="text-sm text-primary font-medium">
                    Relâchez pour ajouter les fichiers
                  </p>
                )}
              </div>
            </div>

            {/* File validation error */}
            {fileError && (
              <div className="flex items-center space-x-2 text-destructive text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{fileError}</span>
              </div>
            )}

            {/* Uploaded Files */}
            {formData.files && formData.files.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Fichiers sélectionnés ({formData.files.length}) :</p>
                <div className="space-y-2">
                  {formData.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <span className="text-sm font-medium">{file.name}</span>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        aria-label={`Supprimer ${file.name}`}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="space-y-4">
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer la Demande'}
            </Button>

            {submitStatus === 'error' && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Une erreur est survenue. Veuillez réessayer ou nous contacter directement.
                </p>
              </div>
            )}

            <p className="text-xs text-muted-foreground text-center">
              En soumettant ce formulaire, vous acceptez notre politique de confidentialité. 
              Vos données sont traitées de manière sécurisée et confidentielle.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

