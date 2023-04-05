<?php

namespace App\Http\Controllers;

use App\Http\Resources\NewsCollection;
use App\Models\news;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $news = new NewsCollection(news::OrderByDesc('id')->paginate(8));
        return Inertia::render('Homepage', [
            'title' => 'LaraNews Homepage',
            'description' => 'Welcome to Portal Berita Cuy Universe',
            'news' => $news
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $news = new news();
        $news ->title = $request->title;
        $news ->category = $request->category;
        $news ->description = $request->description;
        $news ->author = auth()->user()->email;
        $news ->save();
        return redirect()->back()->with('message', 'Berita Berhasil Dibuat');
    }

    /**
     * Display the specified resource.
     */
    public function show(news $news)
    {
        $myNews = $news::where('author', auth()->user()->email)->get();
        return Inertia::render('Dashboard', [
            'myNews' => $myNews
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(news $news, Request $request)
    {
        return Inertia::render('EditNews', [
            'myNews' => $news->find($request->id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        news::where('id', $request->id)->update([
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
        ]);
        return to_route('dashboard')->with('message', 'Update Data Berhasil');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $news = news::find($request->id);
        $news->delete();
        return redirect()->back()->with('message', 'Berita Berhasil Dihapus');
    }
}
