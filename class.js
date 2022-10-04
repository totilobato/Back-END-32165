class User {
    constructor (name, surname, books, pets){
        this.name = name;
        this.surname = surname;
        this.books = books;
        this.pets = pets;
    }

getFullName() {
    console.log(`${this.name} ${this.surname}`)
}

addPet() {
    this.pets.push('Rabbit')
}

countPets() {
    console.log(this.pets.length)
}

addBook() {
    this.books.push({title: 'Titanic', author: 'Leonardo Di Caprio'})
}

getBookNames() {
    console.log(this.books.title)
}
}

const newUser = new User ('Augusto', 'Lobato', [{title: 'Cenicienta', author: 'Maru Botana'}, {title: 'Caperucita Roja', author: 'Leonardo Da Vinci'}],[dog, cat])

newUser.getFullName()
newUser.addPet()
newUser.countPets()
newUser.addBook()
newUser.getBookNames()
