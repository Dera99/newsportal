import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

export default function EditNews(props) {
    console.log('Props ', props)
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        const data = {
           id: props.myNews.id, title, category, description
        }
        router.post('/news/update', data)
        setTitle('')
        setCategory('')
        setDescription('')
    }
    return (
        <div className='min-h-screen dark:bg-gray-800 text-white text-2xl'>
            <Head title={props.title} />
            <Navbar user={props.auth.user} />
            <div className="card w-full lg:w-96 w-96 bg-white dark:bg-gray-800 shadow-xl m-2">
                <div className='p-4 text-2xl'>Edit Berita</div>
                <div className="card-body">
                    <input type="text" placeholder="Title" className=" m-2 input input-bordered w-full "
                                onChange={(title) => setTitle(title.target.value)} defaultValue={props.myNews.title}/>
                    <input type="text" placeholder="category" className=" m-2 input input-bordered w-full "
                                onChange={(category) => setCategory(category.target.value)} defaultValue={props.myNews.category}/>
                    <input type="text" placeholder="description" className=" m-2 input input-bordered w-full "
                                onChange={(description) => setDescription(description.target.value)} defaultValue={props.myNews.description}/>
                    <button className='btn btn-primary m-2' onClick={() => handleSubmit()}>Update</button>
                </div>
            </div>
        </div>
    )
}