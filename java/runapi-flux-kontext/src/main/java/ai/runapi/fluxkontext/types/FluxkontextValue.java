package ai.runapi.fluxkontext.types;

import ai.runapi.core.types.RunApiValue;

abstract class FluxkontextValue extends RunApiValue {
  FluxkontextValue(String value) {
    super(value);
  }
}
