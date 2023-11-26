import React from 'react'

// UI Components
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

// Icons
import { Eye, Pen, Trash } from 'lucide-react'

// Related components
import NotesSubjects from './NotesSubjects';

// Store hooks
import { subjectItems } from '@/lib/store';

import Image from 'next/image';

interface Subject {
    _id: string;
    name: string;
    activeImage: string;
    groupId: string;
    defaultImage: string;
}

type Props = {
    subjects: Subject[]
    term: null | string
    searchQuery: string
    // setTerm: () => void
    // setUserClass: () => void
}

const NotesTable = ({ subjects = [], term = null, searchQuery = "" }: Props) => {
    // Get state and state updater  
    const { items, setItems } = subjectItems();

    return (
        <div className='flex'>
            {/* The subjects tab */}
            <NotesSubjects subjects={subjects} />

            {/* The subject notes tab */}
            <div className='h-[calc(100vh-190px)] overflow-y-scroll w-full'>
                <Table>
                    <TableHeader className='border w-[100vw] border-b-[3px] border-b-black'>
                        <TableRow className='border border-[#4E5058]'>
                            <TableHead className="font-bold">ID</TableHead>
                            <TableHead className='font-bold'>Cover image</TableHead>
                            <TableHead className='font-bold'>Topic</TableHead>
                            <TableHead className="font-bold">Viewed</TableHead>
                            <TableHead className="font-bold">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody className=''>
                        {items?.
                            filter((item) => item.title.toLowerCase().includes(searchQuery))
                            .filter((item) => (term ? item.termId.name === term : true))
                            .map((item) => (
                                <TableRow key={item._id} className='group' >
                                    <TableCell className="truncate max-w-[120px]">{item._id}</TableCell>
                                    <TableCell className='rounded-lg relative'>
                                        <Image src={item.subjectId.activeImage} width={20} height={30} alt="" style={{ width: "120px", height: "60px" }} className='bg-black py-2 rounded-md' />
                                    </TableCell>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell className="text-center">{item.views}</TableCell>
                                    <TableCell className="gap-1 invisible flex group-hover:visible h-full my-auto">
                                        <div className='border border-black rounded-[10px] p-2.5 cursor-pointer hover:bg-black hover:text-white'>
                                            <Eye size={16} className='' />
                                        </div>
                                        <div className='border border-black rounded-[10px] p-2.5 cursor-pointer hover:bg-black hover:text-white'>
                                            <Pen size={16} className='' />
                                        </div>
                                        <div className='border border-black rounded-[10px] p-2.5 cursor-pointer hover:bg-black hover:text-white'>
                                            <Trash size={16} className='' />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default NotesTable