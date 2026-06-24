package ai.runapi.fluxkontext.types;

import com.fasterxml.jackson.annotation.JsonCreator;

/** Model slug for text to image operations. */
public final class TextToImageModel extends FluxkontextValue {
  /** flux-kontext-max model slug. */
  public static final TextToImageModel FLUX_KONTEXT_MAX = new TextToImageModel("flux-kontext-max");
  /** flux-kontext-pro model slug. */
  public static final TextToImageModel FLUX_KONTEXT_PRO = new TextToImageModel("flux-kontext-pro");

  /** Creates a model value from a literal model slug. */
  @JsonCreator
  public TextToImageModel(String value) {
    super(value);
  }
}
