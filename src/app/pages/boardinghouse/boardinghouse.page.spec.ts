import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BoardinghousePage } from './boardinghouse.page';

describe('BoardinghousePage', () => {
  let component: BoardinghousePage;
  let fixture: ComponentFixture<BoardinghousePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardinghousePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BoardinghousePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
