package fluxkontext

type TaskStatus string

type TextToImageParams struct {
	Model                 string `json:"model" help:"required; model slug"`
	Prompt                string `json:"prompt" help:"required; image description (English only)"`
	AspectRatio           string `json:"aspect_ratio,omitempty" help:"optional; output aspect ratio; Default: 16:9"`
	OutputFormat          string `json:"output_format,omitempty" help:"optional; output format; Default: jpeg"`
	SourceImageURL        string `json:"source_image_url,omitempty" help:"optional; source image URL for editing mode"`
	EnableTranslation     *bool  `json:"enable_translation,omitempty" help:"optional; auto-translate non-English prompts. Default: true"`
	EnablePromptExpansion *bool  `json:"enable_prompt_expansion,omitempty" help:"optional; expand the prompt with more detail. Default: false"`
	SafetyTolerance       *int   `json:"safety_tolerance,omitempty" help:"optional; 0-6 for generation, 0-2 for editing. Default: 2"`
	CallbackURL           string `json:"callback_url,omitempty" help:"optional; webhook notification URL"`
	Watermark             string `json:"watermark,omitempty" help:"optional; watermark identifier"`
}

type Image struct {
	URL       string `json:"url"`
	OriginURL string `json:"origin_url,omitempty"`
}

type AsyncTaskResponse struct {
	ID     string     `json:"id"`
	Status TaskStatus `json:"status"`
	Error  string     `json:"error,omitempty"`
}

func (r AsyncTaskResponse) GetID() string     { return r.ID }
func (r AsyncTaskResponse) GetStatus() string { return string(r.Status) }
func (r AsyncTaskResponse) GetError() string  { return r.Error }

type TextToImageResponse struct {
	AsyncTaskResponse
	Images []Image `json:"images,omitempty"`
}
