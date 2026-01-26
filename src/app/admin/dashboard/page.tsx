'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Globe, GraduationCap, FileText, MoreHorizontal, ChevronRight, Activity, FileCheck } from 'lucide-react'
import { dummyCountries, dummyColleges, dummyBlogs } from '@/data/dummyData'

export default function DashboardPage() {
  const stats = [
    {
      title: 'Total Countries',
      value: dummyCountries.length,
      description: 'Active destinations',
      icon: Globe,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Total Colleges',
      value: dummyColleges.length,
      description: 'Educational institutions',
      icon: GraduationCap,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Total Exams',
      value: 0,
      description: 'Standardized tests',
      icon: FileCheck,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Blog Posts',
      value: dummyBlogs.length,
      description: 'Published content',
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ]

  const recentActivity = [
    {
      type: 'country',
      action: 'Added new country',
      target: 'Australia',
      time: '2 hours ago',
      icon: Globe
    },
    {
      type: 'exam',
      action: 'Updated exam',
      target: 'TOEFL',
      time: '5 hours ago',
      icon: FileCheck
    },
    {
      type: 'blog',
      action: 'Published blog',
      target: 'Top 10 Universities',
      time: '1 day ago',
      icon: FileText
    },
    {
      type: 'college',
      action: 'Added new college',
      target: 'University of Melbourne',
      time: '2 days ago',
      icon: GraduationCap
    }
  ]

  const quickActions = [
    {
      title: 'Add Country',
      description: 'Add a new study destination',
      icon: Globe,
      href: '/admin/countries',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Add College',
      description: 'Add a new educational institution',
      icon: GraduationCap,
      href: '/admin/colleges',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Add Exam',
      description: 'Add a new standardized test',
      icon: FileCheck,
      href: '/admin/exams',
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      title: 'Create Blog',
      description: 'Write a new blog post',
      icon: FileText,
      href: '/admin/blogs',
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ]

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200 border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-xl ${stat.bgColor} shadow-sm`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Recent Activity */}
          <Card className="xl:col-span-2 border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Activity className="h-5 w-5 text-blue-600" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription className="text-sm">
                Latest updates and changes in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64 sm:h-80">
                <div className="space-y-3 pr-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="p-2 bg-gray-100 rounded-lg flex-shrink-0">
                        <activity.icon className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm text-gray-900">{activity.action}</span>
                          <span className="text-gray-600 text-sm truncate">&quot;{activity.target}&quot;</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <CardDescription className="text-sm">
                Common tasks you can perform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {quickActions.map((action, index) => (
                  <a
                    key={index}
                    href={action.href}
                    className="block p-3 sm:p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${action.color} text-white group-hover:scale-105 transition-transform`}>
                        <action.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-gray-900">{action.title}</div>
                        <div className="text-xs text-gray-500 mt-1">{action.description}</div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Active Countries */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Active Countries</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>All Active Countries</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-96">
                      <div className="space-y-2 pr-4">
                        {dummyCountries.filter(c => c.status === 'active').map((country) => (
                          <div key={country.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                            <div className="flex items-center space-x-3">
                              <span className="text-lg">{country.flag}</span>
                              <div>
                                <div className="font-medium text-sm">{country.name}</div>
                                <div className="text-xs text-gray-500">{country.slug}</div>
                              </div>
                            </div>
                            <Badge variant="default" className="bg-green-100 text-green-700">Active</Badge>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-48">
                <div className="space-y-2 pr-4">
                  {dummyCountries.filter(c => c.status === 'active').slice(0, 5).map((country) => (
                    <div key={country.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-2">
                        <span>{country.flag}</span>
                        <span className="text-sm font-medium truncate">{country.name}</span>
                      </div>
                      <Badge variant="default" className="bg-green-100 text-green-700 text-xs">Active</Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Recent Blogs */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Recent Blogs</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>All Blog Posts</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-96">
                      <div className="space-y-3 pr-4">
                        {dummyBlogs.map((blog) => (
                          <div key={blog.id} className="p-4 rounded-lg border border-gray-100 hover:bg-gray-50">
                            <div className="space-y-2">
                              <h3 className="font-medium text-gray-900">{blog.title}</h3>
                              <p className="text-sm text-gray-600 line-clamp-2">{blog.content.substring(0, 100)}...</p>
                              <div className="flex items-center justify-between">
                                <Badge variant="secondary" className="text-xs">{blog.category}</Badge>
                                <span className="text-xs text-gray-500">{new Date(blog.createdAt).toLocaleDateString('en-US')}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-48">
                <div className="space-y-2 pr-4">
                  {dummyBlogs.slice(0, 4).map((blog) => (
                    <div key={blog.id} className="space-y-1 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="text-sm font-medium line-clamp-1">{blog.title}</div>
                      <div className="text-xs text-gray-500">{blog.category}</div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Top Colleges */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Top Colleges</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>All Active Colleges</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-96">
                      <div className="space-y-3 pr-4">
                        {dummyColleges.filter(c => c.status === 'active').map((college) => (
                          <div key={college.id} className="p-4 rounded-lg border border-gray-100 hover:bg-gray-50">
                            <div className="space-y-2">
                              <h3 className="font-medium text-gray-900">{college.name}</h3>
                              <p className="text-sm text-gray-600">{college.country}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <span className="text-sm font-medium text-green-600">${college.fees.toLocaleString()}/year</span>
                                  <Badge variant="outline" className="text-xs">{college.duration}</Badge>
                                </div>
                                <Badge variant="default" className="bg-green-100 text-green-700">Active</Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-48">
                <div className="space-y-2 pr-4">
                  {dummyColleges.filter(c => c.status === 'active').slice(0, 4).map((college) => (
                    <div key={college.id} className="space-y-1 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="text-sm font-medium truncate">{college.name}</div>
                      <div className="text-xs text-gray-500">${college.fees.toLocaleString()}/year</div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    
  )
}
