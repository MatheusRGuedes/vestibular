import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatoListComponent } from './candidato-list.component';

describe('CandidatoListComponent', () => {
  let component: CandidatoListComponent;
  let fixture: ComponentFixture<CandidatoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
