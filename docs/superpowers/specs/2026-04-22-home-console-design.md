# Home Console Design

## Goal

Replace the current home page with a console-style configuration page that matches the provided screenshot direction and supports local browser interactions with static frontend data.

## Scope

- Replace the current `Home.vue` content entirely.
- Keep all data static in the frontend.
- Support API key copy/reset interactions.
- Support copying the two Base URL values.
- Support local mode switching for the model section.
- Support model selection and per-model copy interactions.
- Do not add backend integration, persistence, or route changes.

## UI Structure

### API Key Section

- Title and description.
- Editable input-like field bound to a static default API key.
- `Reset` button restores the default key.
- `Copy` button copies the current key.

### Base URL Section

- Title and description.
- Two rows:
  - `OpenAI protocol compatible`
  - `Anthropic protocol compatible`
- Both rows display `https://coder.guygubaby.top`.
- Each row includes its own copy action and success feedback.

### Model Section

- Title and description.
- Two local switch modes:
  - `Through console`
  - `Use config file`
- Clicking a mode updates highlight state and explanatory text only.
- A model list is rendered as selectable chips.
- Clicking a chip selects that model.
- Clicking the copy icon/button on a chip copies only the model name.

## Component Boundaries

- `Home.vue`: route-level orchestration and local state ownership.
- `SectionTitle.vue`: reusable section heading plus description.
- `CopyField.vue`: labeled value field with copy action.
- `ModelChip.vue`: selectable model chip with copy action.

## State

- `apiKey`: current editable API key string.
- `activeMode`: current model switch mode.
- `selectedModel`: current selected model name.
- transient copy/reset success state for buttons and rows.

All state remains in memory only and resets on page reload.

## Data Flow

- Static data lives in `Home.vue` constants.
- Props go down into child components.
- Child components emit explicit events for selection/copy actions.

## Validation

- Run `npm run build`.
- Verify desktop and mobile rendering.
- Verify API key reset/copy.
- Verify Base URL copy buttons.
- Verify model mode switching, model selection, and model copy feedback.
