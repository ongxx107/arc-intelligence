import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: async () => (await import('./feature/support-inbox/support-inbox.component')).SupportInboxComponent,
	},
];
