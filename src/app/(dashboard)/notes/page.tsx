"use client"

// Custom components
import NotesTable from '@/components/NotesTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { subjectItems } from '@/lib/store'

// Data hooks
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'


// Type definitions
type Props = {}

interface ClassGroup {
    _id: string;
    name: string;
}

interface Subject {
    _id: string;
    name: string;
    activeImage: string;
    groupId: string;
    defaultImage: string;
}

const NotesPage = (props: Props) => {
    const { toast } = useToast()
    const [userClass, setUserClass] = useState<string | null>(null); // State to track the selected value
    const [term, setTerm] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [subjects, setSubjects] = useState<Subject[]>([])

    // Handler to update selected class group
    const handleClassGroupChange = (value: string | null) => {
        setUserClass(value);
    };
    // Handler to update selected term 
    const handleTermChange = (value: string | null) => {
        setTerm(value);
    };

    // Fetch class group 
    const { data: classGroups } = useQuery({
        queryKey: ["classGroups"],
        queryFn: async () => {
            try {
                // API request  
                const response = await axios(`https://api-test-f4ae.up.railway.app/v1/classes/groups`);
                return response.data.data;
            } catch (error) {
                // Error handling
                toast({
                        variant: "destructive",
                        title: "Uh oh! Unable to get the class Groups.",
                        description: "There was a problem with your request.",
                    })
            }
        },
    });
    
    // Fetch subjects by class group Id 
    // or get all the subjects if there is no class group Id
   const getSubjectsById = async () => {
       try {
           // API request 
           if (userClass) {
               const response = await axios(`https://api-test-f4ae.up.railway.app/v1/subjects/bygroupId/${userClass}`);
               setSubjects(response.data.data)
               return
           }
           const response = await axios(`https://api-test-f4ae.up.railway.app/v1/subjects`);
           setSubjects(response.data.data)
       } catch (error) {
           // Error handling
           toast({
               variant: "destructive",
               title: "Uh oh! Unable to get the subjects.",
               description: "There was a problem with your request.",
           })
       }
   }

   useEffect(()=> {
        // if class group changes, the subjects should be updated
       getSubjectsById()
   }, [userClass])

  return (
      <div className='w-full'>
          <div className='flex items-start md:items-center justify-between w-full py-5 px-5'>
              <div>
                  <h1 className='text-2xl md:text-4xl font-bold'>Notes</h1>
              </div>
              <div className='flex flex-wrap justify-end md:justify-normal gap-y-2 gap-x-2.5'>
                <Select onValueChange={handleClassGroupChange}>
                      <SelectTrigger className="max-w-fit px-2">
                          <SelectValue placeholder="Select Class" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectGroup>
                              {classGroups?.map((item: ClassGroup) => (
                              <SelectItem key={item._id} value={item._id}>{item.name}</SelectItem>
                            ))}
                          </SelectGroup>
                      </SelectContent>
                </Select>

                  <Select onValueChange={handleTermChange}>
                      <SelectTrigger className="w-[122px]">
                          <SelectValue placeholder="Select Term" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectGroup>
                              <SelectItem value="First Term">1st Term</SelectItem>
                              <SelectItem value="Second Term">2nd Term</SelectItem>
                              <SelectItem value="Third Term">3rd Term</SelectItem>
                          </SelectGroup>
                      </SelectContent>
                </Select>

                <div className='h-[47px]'>
                    <Input type="text" placeholder='search' className='active:outline-none' value={searchQuery} onChange={(e)=> setSearchQuery(e.target.value)} />
                </div>

                  <Button variant="outline" type='button' className='bg-[#7CF5B2] border border-[#292A2F] text-black font-semibold rounded-[16px]'>Create note <Plus className='ml-2' /></Button>
              </div>
          </div>
          <div>
              <NotesTable subjects={subjects} term={term} searchQuery={searchQuery} />
          </div>
      </div>
  )
}

export default NotesPage