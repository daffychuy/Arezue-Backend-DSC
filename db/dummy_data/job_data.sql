insert into job (euid,
 company_name, title, wage, position,
  hours, location, description, status, max_candidate)
values ('66bf3bdd-8290-43a2-ad90-895c83a2232f',
 'alpha_company', 'Senior Software Engineer', '$190,000', 'Web dev', '40 per week',
  'Waterloo, ON', 'How would the dscription of a job be formatted?', 
'Full-time', 1) ON CONFLICT DO NOTHING;

insert into job (euid,
 company_name, title, wage, position,
  hours, location, description, status, max_candidate)
values ('66bf3bdd-8290-43a2-ad90-895c83a2888f',
 'beta_company', 'Senior Backend Engineer', '$200,000', 'Desktop apps', '40+ per week',
  'Waterloo, ON', 'How would the dscription of a job be formatted?',
'Full-time', 1) ON CONFLICT DO NOTHING;