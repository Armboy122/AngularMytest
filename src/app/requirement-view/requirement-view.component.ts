import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequirementService } from '../requirement.service';
import { Requirement } from '../requirement';

@Component({
  selector: 'app-requirement-view',
  templateUrl: './requirement-view.component.html',
  styleUrls: ['./requirement-view.component.css'],
})
export class RequirementViewComponent implements OnInit {
  r: Requirement = {
    id: 0,
    title: '',
    contactMobileNo: '',
    status: '',
  };

  viewId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requirementService: RequirementService
  ) {}

  ngOnInit(): void {
    this.viewId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.viewId) {
      this.requirementService.getRequirement(this.viewId).subscribe((v) => {
        this.r = { ...this.r, ...v };
      });
    }
  }
  onBack(): void {
    this.router.navigate(['/requirement-list']);
  }
}
