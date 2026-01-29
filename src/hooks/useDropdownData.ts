import { useState, useEffect } from 'react'

interface College {
  _id: string
  name: string
  slug: string
  category?: string
}

interface Exam {
  _id: string
  short_name: string
  slug: string
}

interface Country {
  _id: string
  name: string
  slug: string
  flag: string
}

interface DropdownData {
  colleges: College[]
  exams: Exam[]
  countries: Country[]
  loading: boolean
  error: string | null
}

export function useDropdownData(): DropdownData {
  const [data, setData] = useState<DropdownData>({
    colleges: [],
    exams: [],
    countries: [],
    loading: true,
    error: null
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [collegesRes, examsRes, countriesRes] = await Promise.all([
          fetch('/api/colleges'),
          fetch('/api/exams'),
          fetch('/api/countries')
        ])

        const [collegesData, examsData, countriesData] = await Promise.all([
          collegesRes.json(),
          examsRes.json(),
          countriesRes.json()
        ])

        setData({
          colleges: collegesData.success
            ? collegesData.data.colleges?.slice(0, 8) || []
            : [],
          exams: examsData.success
            ? examsData.data
            : [],
          countries: countriesData.success
            ? countriesData.data
            : [],
          loading: false,
          error: null
        })
      } catch (error) {
        console.error('Error fetching dropdown data:', error)
        setData(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load data'
        }))
      }
    }

    fetchData()
  }, [])


  return data
}
