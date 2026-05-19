package fluxkontext

type TaskStatus string

type TextToImageParams struct {
	Model             string `json:"model" help:"required; flux-kontext-pro or flux-kontext-max"`
	Prompt            string `json:"prompt" help:"required; image description (English only)"`
	AspectRatio       string `json:"aspect_ratio,omitempty" help:"optional; 21:9, 16:9, 4:3, 1:1, 3:4, 9:16. Default: 16:9"`
	OutputFormat      string `json:"output_format,omitempty" help:"optional; jpeg or png. Default: jpeg"`
	InputImage        string `json:"input_image,omitempty" help:"optional; image URL for editing mode"`
	EnableTranslation *bool  `json:"enable_translation,omitempty" help:"optional; auto-translate non-English prompts. Default: true"`
	PromptUpsampling  *bool  `json:"prompt_upsampling,omitempty" help:"optional; AI prompt enhancement. Default: false"`
	SafetyTolerance   *int   `json:"safety_tolerance,omitempty" help:"optional; 0-6 for generation, 0-2 for editing. Default: 2"`
	CallbackURL       string `json:"callback_url,omitempty" help:"optional; webhook notification URL"`
	UploadCn          *bool  `json:"upload_cn,omitempty" help:"optional; use China upload servers"`
	Watermark         string `json:"watermark,omitempty" help:"optional; watermark identifier"`
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
