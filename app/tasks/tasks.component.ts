import { Component } from "@angular/core";

@Component({
  moduleId: module.id,
  selector: "tasks",
  templateUrl: "tasks.component.html",
})

export class TaskComponent {
  public tasks: Array<any> = [];

  public constructor() {
    this.tasks = [
      { id: 1, title: "Comprar Notebook Novo", done: false },
      { id: 2, title: "Lavar o carro", done: false },
      { id: 3, title: "Assistir série XYZ", done: false },
      { id: 4, title: "Estudar NativeScript", done: true },
      { id: 5, title: "Comprar Notebook Novo", done: false },
      { id: 6, title: "Lavar o carro", done: false },
      { id: 7, title: "Assistir série XYZ", done: false },
      { id: 8, title: "Estudar NativeScript", done: false },
      { id: 9, title: "Comprar Notebook Novo", done: true },
      { id: 10, title: "Lavar o carro", done: false },
      { id: 11, title: "Comprar Notebook Novo", done: false },
      { id: 12, title: "Assistir série XYZ", done: false },
      { id: 13, title: "Estudar NativeScript", done: false },
      { id: 14, title: "Comprar Notebook Novo", done: false },
    ];
  }
}
