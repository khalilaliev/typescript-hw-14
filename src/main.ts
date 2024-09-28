enum Status {
  Pending = "Pending",
  Completed = "Completed",
}

interface INote {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  status: Status;
  edit(content: string): void;
  markAsCompleted(): void;
}

class Note implements INote {
  static nextId = 1;
  public id: number;
  public title: string;
  public content: string;
  public createdAt: Date;
  public updatedAt: Date;
  public status: Status;

  constructor(title: string, content: string) {
    if (!title || !content)
      throw new Error("Title and content cannot be empty.");
    this.id = Note.nextId++;
    this.title = title;
    this.content = content;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.status = Status.Pending;
  }

  edit(content: string): void {
    if (!content) throw new Error("Content cannot be empty.");
    this.content = content;
    this.updatedAt = new Date();
  }

  markAsCompleted(): void {
    this.status = Status.Completed;
  }
}

class ConfirmedNote extends Note {
  edit(content: string): void {
    super.edit(content);
  }
}

class TodoList {
  private notes: INote[] = [];

  addNote(note: INote): void {
    this.notes.push(note);
  }

  removeNoteById(id: number): void {
    this.notes = this.notes.filter((note) => note.id !== id);
  }

  editNoteById(id: number, content: string): void {
    const note = this.getNoteById(id);
    if (note) {
      note.edit(content);
    }
  }

  getNoteById(id: number): INote | undefined {
    return this.notes.find((note) => note.id === id);
  }

  getAllNotes(): INote[] {
    return this.notes;
  }

  markNoteAsCompleted(id: number): void {
    const note = this.getNoteById(id);
    if (note) {
      note.markAsCompleted();
    }
  }

  getTotalNotesCount(): number {
    return this.notes.length;
  }

  getPendingNotesCount(): number {
    return this.notes.filter((note) => note.status === Status.Pending).length;
  }

  searchNotes(query: string): INote[] {
    return this.notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.content.toLowerCase().includes(query.toLowerCase())
    );
  }

  sortByStatus(): void {
    this.notes.sort((a, b) => a.status.localeCompare(b.status));
  }

  sortByCreationTime(): void {
    this.notes.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }
}

const todoList = new TodoList();

const note1 = new Note("Todo list", "Go to the grocery shop.");
const note2 = new ConfirmedNote("Workout Plan", "Do 30 minutes workout.");

todoList.addNote(note1);
todoList.addNote(note2);

console.log(todoList.getAllNotes());

todoList.editNoteById(1, "Buy some fruits and vegetables.");
todoList.markNoteAsCompleted(2);

console.log(todoList.searchNotes("workout"));
console.log("Total notes:", todoList.getTotalNotesCount());
console.log("Pending notes:", todoList.getPendingNotesCount());

todoList.sortByStatus();
console.log("Sorted by status:", todoList.getAllNotes());
