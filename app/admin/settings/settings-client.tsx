"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

import { createClient } from "@/lib/supabase/client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

const defaultSettings = {
  general: { siteName: "", tagline: "", description: "" },
  seo: { metaTitle: "", metaDescription: "", keywords: "" },
  appearance: { primaryHex: "#000000", accentHex: "#6366f1", darkMode: false },
  notifications: { newUserNotification: false, eventRegistrationNotification: false, newsletterSubscription: false, systemAlerts: false },
  maintenance: { isEnabled: false, message: "" },
  home_content: { heroTitle: "", heroSubtitle: "", aboutSectionText: "", missionStatement: "", visionStatement: "", footerDescription: "" }
}

export default function SettingsClient() {
  const supabase = createClient()
  
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [settingsId, setSettingsId] = useState<number | null>(null)
  const [settings, setSettings] = useState(defaultSettings)

  useEffect(() => {
    async function loadSettings() {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .limit(1)
          .single()

        if (error) {
          // If the table is empty or error occurs, we assume no error but warn. Handled below.
          console.warn('Supabase fetch issue (likely no row exists yet):', error)
        }

        if (data) {
          setSettingsId(data.id)
          setSettings({
            general: data.general || defaultSettings.general,
            seo: data.seo || defaultSettings.seo,
            appearance: data.appearance || defaultSettings.appearance,
            notifications: data.notifications || defaultSettings.notifications,
            maintenance: data.maintenance || defaultSettings.maintenance,
            home_content: data.home_content || defaultSettings.home_content
          })
        }
      } catch (error) {
        console.error('Error fetching settings:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadSettings()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const updateSetting = (section: keyof typeof settings, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }))
  }

  const handleSave = async () => {
    // If we couldn't fetch an ID, we might need to INSERT if nothing exists. 
    // Usually settings tables have exactly one row.
    if (!settingsId) {
      toast.error('No configuration record found. Please ensure row ID 1 exists.')
      return
    }

    setIsSaving(true)
    try {
      const { error } = await supabase
        .from('site_settings')
        .update({
          general: settings.general,
          seo: settings.seo,
          appearance: settings.appearance,
          notifications: settings.notifications,
          maintenance: settings.maintenance,
          home_content: settings.home_content
        })
        .eq('id', settingsId)

      if (error) throw error

      toast.success("Settings saved successfully", {
        description: "Your platform configurations and CMS content have been permanently updated in the database.",
      })
    } catch (error: any) {
      console.error('Save error:', error)
      toast.error('Failed to save settings. ' + error?.message)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="flex space-x-2 border-b pb-2 overflow-hidden">
          <Skeleton className="h-8 w-24 bg-muted/60" />
          <Skeleton className="h-8 w-24 bg-muted/60" />
          <Skeleton className="h-8 w-24 bg-muted/60" />
          <Skeleton className="h-8 w-32 bg-muted/60" />
          <Skeleton className="h-8 w-24 bg-muted/60" />
          <Skeleton className="h-8 w-40 bg-muted/60" />
        </div>
        <Card className="border-border/60 shadow-sm border-none bg-background">
          <CardHeader className="px-0">
            <Skeleton className="h-7 w-64 bg-muted/60 mb-2" />
            <Skeleton className="h-4 w-96 bg-muted/60" />
          </CardHeader>
          <CardContent className="px-0 space-y-6">
            <div className="space-y-3">
              <Skeleton className="h-4 w-24 bg-muted/60" />
              <Skeleton className="h-10 w-full max-w-xl bg-muted/60" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-4 w-24 bg-muted/60" />
              <Skeleton className="h-10 w-full max-w-xl bg-muted/60" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-4 w-32 bg-muted/60" />
              <Skeleton className="h-32 w-full max-w-2xl bg-muted/60" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-24 relative">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0 h-10 mb-8 overflow-x-auto flex-nowrap shrink-0 hide-scroll">
          <TabsTrigger value="general" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 pb-2.5 pt-2 whitespace-nowrap">General</TabsTrigger>
          <TabsTrigger value="seo" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 pb-2.5 pt-2 whitespace-nowrap">SEO</TabsTrigger>
          <TabsTrigger value="appearance" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 pb-2.5 pt-2 whitespace-nowrap">Appearance</TabsTrigger>
          <TabsTrigger value="home_content" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 pb-2.5 pt-2 whitespace-nowrap">Home Page Content</TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 pb-2.5 pt-2 whitespace-nowrap">Notifications</TabsTrigger>
          <TabsTrigger value="maintenance" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 pb-2.5 pt-2 whitespace-nowrap">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="m-0 space-y-6">
          <Card className="border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle>Platform Details</CardTitle>
              <CardDescription>Update your site's core identity and branding text.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-3">
                <Label htmlFor="siteName">Site Name</Label>
                <Input 
                  id="siteName" 
                  value={settings.general.siteName} 
                  onChange={(e) => updateSetting("general", "siteName", e.target.value)}
                  className="max-w-xl"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tagline">Tagline</Label>
                <Input 
                  id="tagline" 
                  value={settings.general.tagline} 
                  onChange={(e) => updateSetting("general", "tagline", e.target.value)}
                  className="max-w-xl"
                />
                <p className="text-sm text-muted-foreground">Appears next to the logo or in prominent headers.</p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">Global Description</Label>
                <Textarea 
                  id="description" 
                  value={settings.general.description} 
                  onChange={(e) => updateSetting("general", "description", e.target.value)}
                  className="max-w-2xl min-h-[100px]"
                />
                <p className="text-sm text-muted-foreground">A detailed paragraph describing the organization.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="m-0 space-y-6">
          <Card className="border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle>Search Engine Optimization</CardTitle>
              <CardDescription>Manage how your site appears in search engine results.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-3">
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input 
                  id="metaTitle" 
                  value={settings.seo.metaTitle} 
                  onChange={(e) => updateSetting("seo", "metaTitle", e.target.value)}
                  className="max-w-xl"
                />
              </div>
              <div className="grid gap-3">
                <div className="flex justify-between max-w-2xl items-end">
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <span className={`text-xs ${settings.seo.metaDescription.length > 160 ? "text-destructive font-medium" : "text-muted-foreground"}`}>
                    {settings.seo.metaDescription.length} / 160 chars
                  </span>
                </div>
                <Textarea 
                  id="metaDescription" 
                  value={settings.seo.metaDescription} 
                  onChange={(e) => updateSetting("seo", "metaDescription", e.target.value)}
                  className="max-w-2xl min-h-[100px]"
                />
                <p className="text-sm text-muted-foreground">Optimal length is between 150-160 characters for search results.</p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="keywords">Keywords</Label>
                <Input 
                  id="keywords" 
                  value={settings.seo.keywords} 
                  onChange={(e) => updateSetting("seo", "keywords", e.target.value)}
                  className="max-w-xl"
                  placeholder="Comma separated values"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="m-0 space-y-6">
          <Card className="border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle>Visual Theme</CardTitle>
              <CardDescription>Control the aesthetic presentation of the platform.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-8 max-w-xl">
                <div className="grid gap-3 border p-4 rounded-lg bg-card text-card-foreground shadow-sm">
                  <Label htmlFor="primaryHex">Primary Color</Label>
                  <div className="flex gap-3 items-center">
                    <Input 
                      id="primaryHex" 
                      type="color"
                      value={settings.appearance.primaryHex} 
                      onChange={(e) => updateSetting("appearance", "primaryHex", e.target.value)}
                      className="w-12 h-12 p-1 cursor-pointer rounded-md border-muted"
                    />
                    <Input 
                      value={settings.appearance.primaryHex}
                      onChange={(e) => updateSetting("appearance", "primaryHex", e.target.value)}
                      className="flex-1 font-mono uppercase"
                    />
                  </div>
                </div>
                <div className="grid gap-3 border p-4 rounded-lg bg-card text-card-foreground shadow-sm">
                  <Label htmlFor="accentHex">Accent Color</Label>
                  <div className="flex gap-3 items-center">
                    <Input 
                      id="accentHex" 
                      type="color"
                      value={settings.appearance.accentHex} 
                      onChange={(e) => updateSetting("appearance", "accentHex", e.target.value)}
                      className="w-12 h-12 p-1 cursor-pointer rounded-md border-muted"
                    />
                    <Input 
                      value={settings.appearance.accentHex}
                      onChange={(e) => updateSetting("appearance", "accentHex", e.target.value)}
                      className="flex-1 font-mono uppercase"
                    />
                  </div>
                </div>
              </div>
              
              <Separator className="max-w-xl" />
              
              <div className="flex items-center justify-between max-w-xl py-2">
                <div className="space-y-0.5">
                  <Label className="text-base font-medium">Force Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Override user preferences and force dark theme for all visitors.</p>
                </div>
                <Switch 
                  checked={settings.appearance.darkMode}
                  onCheckedChange={(val) => updateSetting("appearance", "darkMode", val)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="home_content" className="m-0 space-y-6">
          <Card className="border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle>Home Page Content</CardTitle>
              <CardDescription>Control the primary messaging displayed directly on the front page.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-3">
                <Label htmlFor="heroTitle">Hero Title</Label>
                <Input 
                  id="heroTitle" 
                  value={settings.home_content.heroTitle} 
                  onChange={(e) => updateSetting("home_content", "heroTitle", e.target.value)}
                  className="max-w-xl font-medium"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                <Textarea 
                  id="heroSubtitle" 
                  value={settings.home_content.heroSubtitle} 
                  onChange={(e) => updateSetting("home_content", "heroSubtitle", e.target.value)}
                  className="max-w-2xl min-h-[80px]"
                />
              </div>
              
              <Separator className="max-w-2xl" />

              <div className="grid gap-3">
                <Label htmlFor="aboutSectionText">About Section Text</Label>
                <Textarea 
                  id="aboutSectionText" 
                  value={settings.home_content.aboutSectionText} 
                  onChange={(e) => updateSetting("home_content", "aboutSectionText", e.target.value)}
                  className="max-w-2xl min-h-[120px]"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
                <div className="grid gap-3">
                  <Label htmlFor="missionStatement">Mission Statement</Label>
                  <Textarea 
                    id="missionStatement" 
                    value={settings.home_content.missionStatement} 
                    onChange={(e) => updateSetting("home_content", "missionStatement", e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="visionStatement">Vision Statement</Label>
                  <Textarea 
                    id="visionStatement" 
                    value={settings.home_content.visionStatement} 
                    onChange={(e) => updateSetting("home_content", "visionStatement", e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              
              <Separator className="max-w-2xl" />

              <div className="grid gap-3">
                <Label htmlFor="footerDescription">Footer Description</Label>
                <Textarea 
                  id="footerDescription" 
                  value={settings.home_content.footerDescription} 
                  onChange={(e) => updateSetting("home_content", "footerDescription", e.target.value)}
                  className="max-w-2xl min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="m-0 space-y-6">
          <Card className="border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Configure which automated emails are dispatched to system administrators.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-0 divide-y max-w-3xl border rounded-md p-0 overflow-hidden">
              <div className="flex items-center justify-between p-4 bg-card hover:bg-muted/50 transition-colors">
                <div className="space-y-1">
                  <Label className="text-base font-medium">New User Registrations</Label>
                  <p className="text-sm text-muted-foreground">Receive an email when a new user signs up on the platform.</p>
                </div>
                <Switch 
                  checked={settings.notifications.newUserNotification}
                  onCheckedChange={(val) => updateSetting("notifications", "newUserNotification", val)}
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-card hover:bg-muted/50 transition-colors">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Event Registrations</Label>
                  <p className="text-sm text-muted-foreground">Receive an email when someone registers interest for an event.</p>
                </div>
                <Switch 
                  checked={settings.notifications.eventRegistrationNotification}
                  onCheckedChange={(val) => updateSetting("notifications", "eventRegistrationNotification", val)}
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-card hover:bg-muted/50 transition-colors">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Newsletter Subscriptions</Label>
                  <p className="text-sm text-muted-foreground">Receive an email when someone opts into the newsletter.</p>
                </div>
                <Switch 
                  checked={settings.notifications.newsletterSubscription}
                  onCheckedChange={(val) => updateSetting("notifications", "newsletterSubscription", val)}
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-card hover:bg-muted/50 transition-colors">
                <div className="space-y-1">
                  <Label className="text-base font-medium">System Alerts</Label>
                  <p className="text-sm text-muted-foreground">Critical security and performance alerts.</p>
                </div>
                <Switch 
                  checked={settings.notifications.systemAlerts}
                  onCheckedChange={(val) => updateSetting("notifications", "systemAlerts", val)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="m-0 space-y-6">
          <Card className="border-border/60 shadow-sm border-destructive/20 relative overflow-hidden">
            {settings.maintenance.isEnabled && (
              <div className="absolute top-0 left-0 w-1.5 h-full bg-destructive transition-all" />
            )}
            <CardHeader className="pl-8">
              <CardTitle>Maintenance Mode</CardTitle>
              <CardDescription>Temporarily block public access while updates are performed.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pl-8 pb-8 pr-8">
              <div className="flex items-center justify-between max-w-2xl py-2 bg-muted/40 p-5 rounded-md border border-border">
                <div className="space-y-1">
                  <Label className={`text-base font-medium ${settings.maintenance.isEnabled ? 'text-destructive' : ''}`}>Enable Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">Public visitors will see the maintenance message. Admins can still log in.</p>
                </div>
                <Switch 
                  checked={settings.maintenance.isEnabled}
                  onCheckedChange={(val) => updateSetting("maintenance", "isEnabled", val)}
                />
              </div>
              
              <div className={`grid gap-3 transition-opacity duration-300 ${settings.maintenance.isEnabled ? 'opacity-100' : 'opacity-60 pointer-events-none'}`}>
                <Label htmlFor="maintenanceMessage" className="font-semibold text-foreground">Public Notice Message</Label>
                <Textarea 
                  id="maintenanceMessage" 
                  value={settings.maintenance.message} 
                  onChange={(e) => updateSetting("maintenance", "message", e.target.value)}
                  disabled={!settings.maintenance.isEnabled}
                  className="max-w-2xl min-h-[120px] bg-background"
                />
                <p className="text-sm text-muted-foreground">This message will be displayed to all non-admin visitors navigating to the site.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Sticky Action Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t p-4 flex justify-end z-40 transition-all shadow-[0_-4px_14px_-8px_rgba(0,0,0,0.1)]">
        <div className="container mx-auto max-w-5xl flex justify-end px-4">
          <Button onClick={handleSave} disabled={isSaving || isLoading} size="lg" className="min-w-[150px] shadow-sm font-medium">
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin text-primary-foreground" />
                Saving Output...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
