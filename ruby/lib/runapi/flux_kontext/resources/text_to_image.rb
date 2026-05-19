# frozen_string_literal: true

module RunApi
  module FluxKontext
    module Resources
      # Flux Kontext image generation resource.
      # Generate and edit images with Flux Kontext models.
      class TextToImage
        include RunApi::Core::ResourceHelpers

        ENDPOINT = "/api/v1/flux_kontext/text_to_image"

        RESPONSE_CLASS = Types::TextToImageResponse
        COMPLETED_RESPONSE_CLASS = Types::CompletedTextToImageResponse

        def initialize(http)
          @http = http
        end

        # Generate an image and wait until complete.
        #
        # @param params [Hash] generation parameters
        # @return [RunApi::FluxKontext::Types::CompletedTextToImageResponse] completed generation with images
        def run(**params)
          task = create(**params)
          poll_until_complete { get(task.id) }
        end

        # Create an image generation task.
        #
        # @param params [Hash] generation parameters
        # @return [RunApi::FluxKontext::Types::TextToImageResponse] task creation result with id
        def create(**params)
          params = compact_params(params)
          validate_params!(params)
          request(:post, ENDPOINT, body: params)
        end

        # Get generation status by task ID.
        #
        # @param id [String] task ID
        # @return [RunApi::FluxKontext::Types::TextToImageResponse] current generation status
        def get(id)
          request(:get, "#{ENDPOINT}/#{id}")
        end

        private

        def validate_params!(params)
          raise Core::ValidationError, "model is required" unless param(params, :model)
          raise Core::ValidationError, "prompt is required" unless param(params, :prompt)

          model = param(params, :model)
          unless Types::MODELS.include?(model)
            raise Core::ValidationError, "Invalid model: #{model}. Must be one of: #{Types::MODELS.join(", ")}"
          end

          validate_optional!(params, :aspect_ratio, Types::ASPECT_RATIOS)
          validate_optional!(params, :output_format, Types::OUTPUT_FORMATS)
        end
      end
    end
  end
end
