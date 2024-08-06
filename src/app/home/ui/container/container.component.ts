import { Component, input, OnInit } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-container',
    template: `
        <div class="mx-auto max-w-fit overflow-auto px-4 m-6 mr-6 ml-6 drop-shadow-lg shadow-yellow-300 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col">
            <h1 class="mb-2 text-2xl font-bold tracking-tight text-green-500 dark:text-white">{{headerTitle()}}</h1>
            <ng-content></ng-content>
        </div>
    `
})

export class ContainerComponent {
    headerTitle = input<string>('');
}