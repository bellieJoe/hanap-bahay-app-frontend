import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SamplePage } from './sample.page';

describe('SamplePage', () => {
  let component: SamplePage;
  let fixture: ComponentFixture<SamplePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamplePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SamplePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
