import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react'

export default function Dashboard(props) {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [isNotif, setIsNotif] = useState('');

    const handleSubmit = () => {
        const data = {
            title, category, description
        }
        router.post('/news', data)
        setIsNotif(true)
        setTitle('')
        setCategory('')
        setDescription('')
    }
    useEffect(() => {
        if (!props.myNews) {
            router.get('/news', props.myNews)
        }
        return;
    }, [])

    return (
        <AuthenticatedLayout
            user={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Berita Saya</h2>}
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {isNotif &&
                                <div className="alert alert-success shadow-lg">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        <span>{props.flash.message}</span>
                                    </div>
                                </div>
                            }
                            <input type="text" placeholder="Title" className=" m-2 input input-bordered w-full "
                                onChange={(title) => setTitle(title.target.value)} value={title} />
                            <input type="text" placeholder="Category" className=" m-2 input input-bordered w-full "
                                onChange={(category) => setCategory(category.target.value)} value={category} />
                            <input type="text" placeholder="Description" className=" m-2 input input-bordered w-full "
                                onChange={(description) => setDescription(description.target.value)} value={description} />
                            <button className='btn btn-primary m-2' onClick={() => handleSubmit()}>Submit</button>
                        </div>
                    </div>
                    <div className='p-4'>
                        <div className='py-12 max-w-7xl mx-auto sm:px-6 lg:px-8'>
                            {props.myNews && props.myNews.length > 0 ? props.myNews.map((news, i) => {
                                return (
                                    <div key={i} className="card w-full lg:w-96 w-96 bg-white dark:bg-gray-800 shadow-xl m-2">
                                        <div className="card-body">
                                            <h2 className="card-title">
                                                {news.title}
                                                <div className="badge badge-secondary">NEW</div>
                                            </h2>
                                            <p>{news.description}</p>
                                            <div className="card-actions justify-end">
                                                <div className="badge badge-inline">{news.category}</div>
                                                <div className="badge badge-outline">
                                                    <Link href={route('edit.news')} method="get" data={{ id: news.id }} as="button">
                                                        Edit
                                                    </Link>
                                                </div>
                                                <div className="badge badge-outline">
                                                    <Link href={route('delete.news')} method="post" data={{ id: news.id }} as="button">
                                                        Delete
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : <p>Anda belum memiliki berita </p>}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
