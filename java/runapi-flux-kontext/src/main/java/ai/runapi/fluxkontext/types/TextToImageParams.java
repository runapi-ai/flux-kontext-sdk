package ai.runapi.fluxkontext.types;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/** Parameters for text to image operations. */
public final class TextToImageParams {
  private final String model;
  private final String prompt;
  private final String aspectRatio;
  private final String outputFormat;
  private final String sourceImageUrl;
  private final Boolean enableTranslation;
  private final Boolean enablePromptExpansion;
  private final Integer safetyTolerance;
  private final String callbackUrl;
  private final Boolean watermark;

  private TextToImageParams(Builder builder) {
    this.model = FluxkontextParamUtils.requireNonBlankTrim(builder.model, "model");
    this.prompt = FluxkontextParamUtils.requireNonBlank(builder.prompt, "prompt");
    this.aspectRatio = builder.aspectRatio;
    this.outputFormat = builder.outputFormat;
    this.sourceImageUrl = builder.sourceImageUrl;
    this.enableTranslation = builder.enableTranslation;
    this.enablePromptExpansion = builder.enablePromptExpansion;
    this.safetyTolerance = builder.safetyTolerance;
    this.callbackUrl = builder.callbackUrl;
    this.watermark = builder.watermark;
  }

  /** Creates a new TextToImageParams builder. */
  public static Builder builder() {
    return new Builder();
  }

  /** Returns the RunAPI action key for this request. */
  public String action() {
    return "flux-kontext/text-to-image";
  }

  /** Converts these parameters to the JSON request body shape. */
  public Map<String, Object> toMap() {
    Map<String, Object> raw = new LinkedHashMap<String, Object>();
    raw.put("model", FluxkontextParamUtils.wireValue(model));
    raw.put("prompt", FluxkontextParamUtils.wireValue(prompt));
    raw.put("aspect_ratio", FluxkontextParamUtils.wireValue(aspectRatio));
    raw.put("output_format", FluxkontextParamUtils.wireValue(outputFormat));
    raw.put("source_image_url", FluxkontextParamUtils.wireValue(sourceImageUrl));
    raw.put("enable_translation", FluxkontextParamUtils.wireValue(enableTranslation));
    raw.put("enable_prompt_expansion", FluxkontextParamUtils.wireValue(enablePromptExpansion));
    raw.put("safety_tolerance", FluxkontextParamUtils.wireValue(safetyTolerance));
    raw.put("callback_url", FluxkontextParamUtils.wireValue(callbackUrl));
    raw.put("watermark", FluxkontextParamUtils.wireValue(watermark));
    return FluxkontextParamUtils.compact(raw);
  }



  /** Builder for {@link TextToImageParams}. */
  public static final class Builder {
    private String model;
    private String prompt;
    private String aspectRatio;
    private String outputFormat;
    private String sourceImageUrl;
    private Boolean enableTranslation;
    private Boolean enablePromptExpansion;
    private Integer safetyTolerance;
    private String callbackUrl;
    private Boolean watermark;

    private Builder() {}

    /** Sets the model slug using a typed model value. */
    public Builder model(TextToImageModel value) {
      this.model = java.util.Objects.requireNonNull(value, "model").value();
      return this;
    }

    /** Sets the model slug using a string value. */
    public Builder model(String value) {
      this.model = FluxkontextParamUtils.requireNonBlankTrim(value, "model");
      return this;
    }


    /** Sets the text prompt. */
    public Builder prompt(String value) {
      this.prompt = FluxkontextParamUtils.requireNonBlank(value, "prompt");
      return this;
    }

    /** Sets the output aspect ratio. */
    public Builder aspectRatio(String value) {
      this.aspectRatio = FluxkontextParamUtils.requireNonBlank(value, "aspectRatio");
      return this;
    }

    /** Sets the output format. */
    public Builder outputFormat(String value) {
      this.outputFormat = FluxkontextParamUtils.requireNonBlank(value, "outputFormat");
      return this;
    }

    /** Sets the source image URL. */
    public Builder sourceImageUrl(String value) {
      this.sourceImageUrl = FluxkontextParamUtils.requireNonBlank(value, "sourceImageUrl");
      return this;
    }

    /** Sets the enable translation. */
    public Builder enableTranslation(boolean value) {
      this.enableTranslation = value;
      return this;
    }

    /** Sets the prompt expansion toggle. */
    public Builder enablePromptExpansion(boolean value) {
      this.enablePromptExpansion = value;
      return this;
    }

    /** Sets the safety tolerance. */
    public Builder safetyTolerance(int value) {
      this.safetyTolerance = value;
      return this;
    }

    /** Sets the webhook URL for task completion notifications. */
    public Builder callbackUrl(String value) {
      this.callbackUrl = FluxkontextParamUtils.requireNonBlank(value, "callbackUrl");
      return this;
    }

    /** Sets the watermark toggle. */
    public Builder watermark(boolean value) {
      this.watermark = value;
      return this;
    }

    /** Builds immutable text to image parameters. */
    public TextToImageParams build() {
      return new TextToImageParams(this);
    }
  }
}
