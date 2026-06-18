package fluxkontext

// TaskStatus represents the lifecycle state of an async task (e.g. "pending", "processing", "completed", "failed").
type TaskStatus string

// TextToImageParams holds the request parameters for Flux Kontext image creation.
// By default the endpoint generates an image from scratch. When SourceImageURL is
// provided, it switches to editing mode — transforming the source image according
// to the prompt. The SafetyTolerance range differs between modes: 0-6 for
// generation and 0-2 for editing.
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

// Image holds a single generated or edited image result.
// URL is the CDN-delivered link. OriginURL, when present, is the pre-CDN
// original location before any CDN processing or optimization.
type Image struct {
	URL       string `json:"url"`
	OriginURL string `json:"origin_url,omitempty"`
}

// AsyncTaskResponse carries the common fields shared by all async task results.
// It implements the core.TaskResponse interface, allowing the generic polling
// helpers to track task progress and detect completion or failure.
type AsyncTaskResponse struct {
	ID     string     `json:"id"`
	Status TaskStatus `json:"status"`
	Error  string     `json:"error,omitempty"`
}

// GetID returns the unique task identifier assigned by the API.
func (r AsyncTaskResponse) GetID() string { return r.ID }

// GetStatus returns the current lifecycle state as a string for the polling interface.
func (r AsyncTaskResponse) GetStatus() string { return string(r.Status) }

// GetError returns the error message when the task has failed, or an empty string otherwise.
func (r AsyncTaskResponse) GetError() string { return r.Error }

// TextToImageResponse is the result of a Flux Kontext text-to-image task.
// It covers both generation and editing results — the mode depends on whether
// SourceImageURL was set in the request. On success, Images contains the
// output; on failure, the embedded AsyncTaskResponse carries the error.
type TextToImageResponse struct {
	AsyncTaskResponse
	Images []Image `json:"images,omitempty"`
}
