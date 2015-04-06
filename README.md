# diatomic
A simple app in Rails and JavaScript for creating digital lab notes.

## App Design

### Schema
![Database schema](diatomic_schema.jpg)
[Schema XML](db_schema.xml)

### Models
User
  - has_many created_experiments
  - has_many reviewed_experiments
  - has_many completed_experiment_steps
  - has_many rooms_managed

Position

Experiment
  - has_many steps, through procedures
  - has_many categories, or, has and belongs to many categories
  - has_many locations, through procedures

Procedure
  - join table between Experiment and Step

Step
  - uses many equipment
  - has_many tags, or, has and belongs to many tags

Location
  - has_many equipment

Category
  - has and belongs to many experiments

Tag
  - has and belongs to many steps

Equipment
  - belongs to location

### Stretch Goals
- Experiment Templates, with pre-defined sets of procedures that are created when a template is chosen (creates new experiment, creates new procedures with existing steps)
- Permissions related to Position, with Admin all access, Primary Invesigator with experiment/reviewer access - not too sure about this
