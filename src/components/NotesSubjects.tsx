"use client"
import React, { useEffect, useState } from 'react'

// UI Components
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn } from '@/lib/utils';
import axios from 'axios';
import { subjectItems } from '@/lib/store';
import { toast } from './ui/use-toast';


interface Subject {
    _id: string;
    name: string;
    activeImage: string;
    groupId: string;
    defaultImage: string;
}

type Props = {
    subjects: Subject[]
}

const NotesSubjects = ({subjects}: Props) => {
    // console.log(subjects)
    const [active, setActive] = useState<string>("")

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    // if (!isMounted) {
    //     return null
    // }

    const { items, setItems } = subjectItems();

    const getLessonsBySubjectId = async (id: string) => {
        try {
            // API request
            const response = await axios(`https://api-test-f4ae.up.railway.app/v1/lessons/bysubject/${id}`);
            setItems(response.data.data)
        } catch (error) {
            // Error handling
            toast({
                variant: "destructive",
                title: "Uh oh! Unable to get the subject notes.",
                description: "There was a problem with your request.",
            })
        }
    }

    // console.log(items)
  return (
      <div className='min-w-[200px]  md:w-fit md:flex-shrink-0 border-r-2 border-r-[#4E5058]'>
          <Table>
              <TableHeader>
                  <TableRow>
                      <TableHead className="font-bold border-t border-t-black border-b-[3px] border-b-black mb-auto">Subjects</TableHead>
                  </TableRow>
              </TableHeader>
              <div className='h-[calc(100vh-250px)] overflow-auto pt-2'>
                  <TableBody>
                      {subjects?.map((subject) => (
                          <TableRow 
                          key={subject._id} 
                              className={cn("border-none h-fit cursor-pointer w-full", active === subject._id ? "bg-[#45CD81] font-semibold hover:bg-[#45CD81]" : "")}
                          onClick={() => {
                              getLessonsBySubjectId(subject._id)
                              setActive(subject._id)
                          }}
                          >
                              <TableCell className="">{subject.name}</TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
              </div>
          </Table>
      </div>
  )
}

export default NotesSubjects