# frozen_string_literal: true

module RunApi
  module FluxKontext
    module Types
      MODELS = %w[flux-kontext-pro flux-kontext-max].freeze

      ASPECT_RATIOS = %w[21:9 16:9 4:3 1:1 3:4 9:16].freeze
      OUTPUT_FORMATS = %w[jpeg png].freeze

      class Image < RunApi::Core::BaseModel
        optional :url, String
        optional :origin_url, String
      end

      class TextToImageResponse < RunApi::Core::TaskResponse
        required :id, String
        optional :status, String, enum: -> { RunApi::Core::TaskResponse::Status::ALL }
        optional :images, [-> { Image }]
        optional :error, String
      end

      # Narrowed response returned by `text_to_image.run()` once polling observes
      # `status: "completed"`. `images` is required so consumers never have to
      # null-check it on a successful task.
      class CompletedTextToImageResponse < TextToImageResponse
        required :images, [-> { Image }]
      end
    end
  end
end
