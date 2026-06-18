# frozen_string_literal: true

module RunApi
  module FluxKontext
    # Flux Kontext image generation and editing API client.
    #
    # Supports pure text-to-image generation and image editing via
    # source_image_url. Pro and max quality tiers available.
    #
    # @example
    #   client = RunApi::FluxKontext::Client.new(api_key: "your-api-key")
    #   result = client.text_to_image.run(
    #     model: "flux-kontext-pro", prompt: "A futuristic cityscape"
    #   )
    class Client < RunApi::Core::Client
      # @return [Resources::TextToImage] Image generation operations.
      attr_reader :text_to_image

      def initialize(api_key: nil, **options)
        super
        @text_to_image = Resources::TextToImage.new(http)
      end
    end
  end
end
