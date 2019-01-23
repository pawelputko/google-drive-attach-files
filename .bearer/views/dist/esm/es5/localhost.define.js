// localhost: Custom Elements Define Library, ES Module/ES5 Target
import { defineCustomElement } from './localhost.core.js';
import {
  Alert,
  BearerAuthorized,
  BearerBadge,
  BearerCheckbox,
  BearerDropdownButton,
  BearerForm,
  BearerInput,
  BearerLoader,
  BearerRadio,
  BearerSelect,
  BearerSetup,
  BearerSetupDisplay,
  BearerTextarea,
  Button,
  ConnectAction,
  FeatureAction,
  FeatureDisplay,
  SetupAction,
  SetupDisplay
} from './localhost.components.js';

export function defineCustomElements(window, opts) {
  defineCustomElement(window, [
    Alert,
    BearerAuthorized,
    BearerBadge,
    BearerCheckbox,
    BearerDropdownButton,
    BearerForm,
    BearerInput,
    BearerLoader,
    BearerRadio,
    BearerSelect,
    BearerSetup,
    BearerSetupDisplay,
    BearerTextarea,
    Button,
    ConnectAction,
    FeatureAction,
    FeatureDisplay,
    SetupAction,
    SetupDisplay
  ], opts);
}