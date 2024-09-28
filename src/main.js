var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Status;
(function (Status) {
    Status["Pending"] = "Pending";
    Status["Completed"] = "Completed";
})(Status || (Status = {}));
var Note = /** @class */ (function () {
    function Note(title, content) {
        if (!title || !content)
            throw new Error("Title and content cannot be empty.");
        this.id = Note.nextId++;
        this.title = title;
        this.content = content;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.status = Status.Pending;
    }
    Note.prototype.edit = function (content) {
        if (!content)
            throw new Error("Content cannot be empty.");
        this.content = content;
        this.updatedAt = new Date();
    };
    Note.prototype.markAsCompleted = function () {
        this.status = Status.Completed;
    };
    Note.nextId = 1;
    return Note;
}());
var ConfirmedNote = /** @class */ (function (_super) {
    __extends(ConfirmedNote, _super);
    function ConfirmedNote() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConfirmedNote.prototype.edit = function (content) {
        _super.prototype.edit.call(this, content);
    };
    return ConfirmedNote;
}(Note));
var TodoList = /** @class */ (function () {
    function TodoList() {
        this.notes = [];
    }
    TodoList.prototype.addNote = function (note) {
        this.notes.push(note);
    };
    TodoList.prototype.removeNoteById = function (id) {
        this.notes = this.notes.filter(function (note) { return note.id !== id; });
    };
    TodoList.prototype.editNoteById = function (id, content) {
        var note = this.getNoteById(id);
        if (note) {
            note.edit(content);
        }
    };
    TodoList.prototype.getNoteById = function (id) {
        return this.notes.find(function (note) { return note.id === id; });
    };
    TodoList.prototype.getAllNotes = function () {
        return this.notes;
    };
    TodoList.prototype.markNoteAsCompleted = function (id) {
        var note = this.getNoteById(id);
        if (note) {
            note.markAsCompleted();
        }
    };
    TodoList.prototype.getTotalNotesCount = function () {
        return this.notes.length;
    };
    TodoList.prototype.getPendingNotesCount = function () {
        return this.notes.filter(function (note) { return note.status === Status.Pending; }).length;
    };
    TodoList.prototype.searchNotes = function (query) {
        return this.notes.filter(function (note) {
            return note.title.toLowerCase().includes(query.toLowerCase()) ||
                note.content.toLowerCase().includes(query.toLowerCase());
        });
    };
    TodoList.prototype.sortByStatus = function () {
        this.notes.sort(function (a, b) { return a.status.localeCompare(b.status); });
    };
    TodoList.prototype.sortByCreationTime = function () {
        this.notes.sort(function (a, b) { return a.createdAt.getTime() - b.createdAt.getTime(); });
    };
    return TodoList;
}());
var todoList = new TodoList();
var note1 = new Note("Todo list", "Go to the grocery shop.");
var note2 = new ConfirmedNote("Workout Plan", "Do 30 minutes workout.");
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
