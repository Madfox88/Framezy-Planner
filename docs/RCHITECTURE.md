Framezy Planner – Agreed Structure & Decisions

This document summarizes all structural, conceptual, and product decisions made so far. It intentionally avoids UI implementation details and focuses on how the app is meant to work at a system level. This document is the authoritative source of truth for implementation.

⸻

1. Core Philosophy

Framezy Planner is a professional planning application centered around clarity, structure, and scalability. The app is designed to support individual users and teams, with clean mental models similar to professional tools like Planner, Asana, and Notion, while remaining simpler and more intentional.

The app prioritizes:
	•	Clear hierarchy
	•	Predictable behavior
	•	Separation between structure (plans, stages) and outcomes (goals)
	•	Dashboards as read-only intelligence, not control centers

⸻

2. Primary Object: Plan

The primary object in the app is a Plan.

A Plan represents a concrete, start-to-finish piece of work.

Examples:
	•	Launch a new collection
	•	Marketing campaign Q2
	•	Website redesign
	•	Build Framezy Planner v1

Plans are always created inside a Workspace and are the main containers for execution.

Plans can be:
	•	Created from scratch
	•	Created from a template (future feature)

⸻

3. Workspace Structure

A Workspace contains:
	•	Multiple Plans
	•	Shared users (owner, members)

The active workspace determines which plans, tasks, and goals are visible.

3.1 Permissions and Ownership Defaults

By default:
	•	All workspace members can create and manage Plans
	•	All workspace members can create, edit, and move Tasks
	•	All workspace members can create and edit Stages within a Plan
	•	All workspace members can link Goals to Plans

Workspace owners may gain additional permissions later, but no restrictive role behavior is enforced at the core system level at this stage.

⸻

4. Inside a Plan

Each Plan contains three main components.

4.1 Stages

Stages represent the workflow phases of a plan.

Rules:
	•	Stages are ordered
	•	Every task belongs to exactly one Stage
	•	Stages represent lifecycle phases, not meaning or priority

Examples of stages:
	•	Initiation
	•	Planning
	•	Execution
	•	Review
	•	Done

Stages are structural and required for plans.

Each Plan must always contain at least one Stage.

⸻

4.2 Tasks

Tasks are the atomic units of work.

Rules:
	•	Each task belongs to exactly one Plan
	•	Each task belongs to exactly one Stage
	•	Tasks move between stages as work progresses
	•	Tasks represent actionable steps

Unplanned Tasks
Tasks may temporarily exist as unplanned or inbox tasks.

Rules for unplanned tasks:
	•	They belong to a Workspace
	•	They do not belong to a Plan or Stage yet
	•	They appear in Today’s Schedule and inbox-style views
	•	They do not contribute to Goal progress
	•	They are expected to be assigned to a Plan and Stage eventually

⸻

4.3 Goals

Goals represent outcomes and success criteria.

Rules:
	•	Goals do not replace Plans
	•	Goals do not own Tasks directly
	•	Goals may be linked to one or more Plans
	•	Plans may exist without Goals
	•	Goals may exist without Plans
	•	Goals track outcomes, not execution

Examples:
	•	Launch collection by March 15
	•	Increase monthly revenue by 20%
	•	Publish 20 posters

Goal progress is always derived from Plan and Task data and is never manually set.

Goals may be marked as completed or archived without deleting historical data.

⸻

5. Views

Views are projections of the same underlying data. They do not change structure or ownership.

5.1 Board View
	•	Primary axis: Stages
	•	Tasks are grouped by Stage
	•	Dragging a task changes its Stage
	•	Used for flow-oriented thinking

5.2 List View
	•	Primary axis: Tasks
	•	Stages appear as a column or filter
	•	Supports filtering by:
	•	Stage
	•	Due date
	•	Completion status
	•	Priority (if used)

Used for operational and triage work.

Views are client-side representations and do not affect stored data.

⸻

6. Dashboard Philosophy

The Dashboard is a read-only intelligence layer.

It answers questions such as:
	•	What needs attention today?
	•	Am I making progress?
	•	How consistent am I?

The Dashboard aggregates data across:
	•	All active Plans
	•	All Stages
	•	All Tasks

The Dashboard does not replace Plan-level work.

⸻

7. Dashboard Cards (Agreed)

7.1 Today’s Schedule
	•	Shows tasks due today
	•	Excludes completed tasks
	•	Aggregates across all active Plans
	•	Allows quick creation of unplanned tasks

⸻

7.2 Goal Progress
	•	Displays progress toward Goals
	•	Progress is derived from:
	•	Linked Plans
	•	Completed Tasks

⸻

7.3 Productivity Stats

Productivity stats are calculated and read-only.

Metrics include:
	•	Completed tasks
	•	Average daily focus
	•	Focus streak
	•	Completion rate

Defaults:
	•	Stats are calculated over the last 7 days
	•	Only tasks from active Plans are included
	•	Archived Plans are excluded by default

⸻

8. Plan Lifecycle

Plans have a lifecycle state:
	•	Active
	•	Archived

Archived Plans:
	•	Are read-only
	•	Do not appear in active views
	•	Do not count toward productivity stats
	•	Remain visible for historical reference
	•	Can be restored

Plans are archived, not deleted, by default.

⸻

9. Templates (Future Feature)

Templates are blueprints for Plans.

Templates define:
	•	Default Stages
	•	Starter Tasks
	•	Optional starter Goals

Templates do not define behavior.

Templates create Plans; Plans may link to Goals.

Templates will be implemented after the core Plan system is stable.

⸻

10. Terminology Decisions

The terminology stack is fixed as:
	•	Workspace
	•	Plan
	•	Stage
	•	Task
	•	Goal

The term Stages is used instead of buckets or pools.

⸻

11. Implementation Rule

This document is authoritative.
	•	No structural changes should be made without updating this document
	•	AI-assisted implementation must follow this document exactly
	•	UI, templates, and optimizations must conform to these rules

