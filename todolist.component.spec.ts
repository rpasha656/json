import {
    async,
    TestBed
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { } from '';
// import { Todo, TodolistComponent, TodolistModule } from './index';
import {TodolistComponent, TodolistModule } from './index';
import { PubSubServiceContract, Title } from 'microui-contracts';
import { PubSubService } from 'microui-contracts/mocks';
@Component({
    selector: 'as-test',
    template: '<as-todolist></as-todolist>'
})

class TestComponent {
}

let todoCompiled;
let todolistCmp: TodolistComponent;

describe('TodolistComponent', () => {
    let pubsub: PubSubServiceContract;
    beforeEach(() => {
        pubsub = new PubSubService();
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [TodolistModule],
            providers: [
                {
                    provide: Title,
                    useValue: 'This title was injected!'
                },
                {
                    provide: PubSubServiceContract,
                    // You want to map to an "Instance" value rather than a class, 
                    // since the state needs to be shared between host and the micro ui  
                    useValue: pubsub
                }]
        });
    });
    it('Testig Expiration Date', async(() => {
        TestBed.compileComponents().then(() => {
            let fixture = TestBed.createComponent(TodolistComponent);
            fixture.detectChanges();
            todoCompiled = fixture.nativeElement;
            todolistCmp = fixture.debugElement
                .children[0].componentInstance;
            let item = todoCompiled.querySelectorAll('#expDate')[0];
            fixture.detectChanges();
            console.log(item.getAttribute('ng-reflect-model'));
            expect(item.getAttribute('ng-reflect-model')).toBeTruthy('ngOnInit()');
        });
    }));
    it('Testing Exceeding length', async(() => {
        TestBed.compileComponents().then(() => {
            let fixture = TestBed.createComponent(TodolistComponent);
            fixture.detectChanges();
            fixture.componentInstance.displayName = 'Name Changed';
            fixture.detectChanges();
            todoCompiled = fixture.nativeElement;
            let displayModelName = todoCompiled.querySelectorAll('#display')[0].getAttribute('ng-reflect-model');
            console.log(displayModelName);
            expect(displayModelName.length).toBeLessThan(40);
            /* fixture.detectChanges();
             console.log(item.getAttribute('ng-reflect-model'));
             expect(item.getAttribute('ng-reflect-model')).toBeTruthy('ngOnInit()');*/
        });
    }));
    /* it('should have been created successfully', async(() => {
        TestBed.compileComponents().then(() => {
            
            expect(todoCompiled).toBeDefined();
        });
    }));

    it('should add todo successfully', async(() => {
        TestBed.compileComponents().then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            fixture.detectChanges();
            todoCompiled = fixture.nativeElement;
            todolistCmp = fixture.debugElement
                .children[0].componentInstance;
            todolistCmp.todo = new Todo('test', true);
            todolistCmp.addTodo();
            fixture.detectChanges();

            let items = todoCompiled.querySelectorAll('.list-group-item');
            expect(items.length).toEqual(3);

            let item = items[items.length - 1];
            expect(item.querySelector('label').textContent).toEqual(' test');
            expect(item.querySelector('input[type="checkbox"]').value).toBeTruthy();
        });
    }));

    it('should delete todo successfully', async(() => {
        TestBed.compileComponents().then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            fixture.detectChanges();

            todoCompiled = fixture.nativeElement;
            todolistCmp = fixture.debugElement
                .children[0].componentInstance;

            todolistCmp.delTodo(0);
            fixture.detectChanges();
            expect(todoCompiled.querySelectorAll('.list-group-item').length)
                .toEqual(1);
        });
    }))*/
});
