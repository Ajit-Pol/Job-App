import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlljobsComponent } from './alljobs.component';

describe('AlljobsComponent', () => {
  let component: AlljobsComponent;
  let fixture: ComponentFixture<AlljobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlljobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlljobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
