# frozen_string_literal: true

module RunApi
  module FluxKontext
    module Types
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
