export class Post{
    id: number
    author: string
    title: string
    date: string
    content: string
    constructor(id: number, author: string, title: string, date: string, content: string){
        this.id = id;
        this.author = author;
        this.title = title;
        this.date = date;
        this.content = content;
    }
}