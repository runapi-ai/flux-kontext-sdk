# frozen_string_literal: true

require "spec_helper"

RSpec.describe RunApi::FluxKontext::Resources::TextToImage do
  let(:http) { instance_double(RunApi::Core::HttpClient) }
  let(:text_to_image) { described_class.new(http) }
  let(:endpoint) { "/api/v1/flux_kontext/text_to_image" }

  describe "#create" do
    it "POSTs to the correct endpoint with params" do
      params = {model: "flux-kontext-pro", prompt: "a futuristic cityscape"}
      expect(http).to receive(:request).with(:post, endpoint, body: params)
        .and_return("id" => "task-1")

      result = text_to_image.create(**params)
      expect(result).to be_a(RunApi::FluxKontext::Types::TextToImageResponse)
      expect(result.id).to eq("task-1")
      expect(result["id"]).to eq("task-1")
    end

    it "accepts flux-kontext-max model" do
      params = {model: "flux-kontext-max", prompt: "a sunset over mountains", aspect_ratio: "16:9"}
      expect(http).to receive(:request).with(:post, endpoint, body: params)
        .and_return("id" => "task-2")

      result = text_to_image.create(**params)
      expect(result).to be_a(RunApi::FluxKontext::Types::TextToImageResponse)
      expect(result.id).to eq("task-2")
      expect(result["id"]).to eq("task-2")
    end

    it "raises ValidationError when model is missing" do
      expect { text_to_image.create(prompt: "test") }
        .to raise_error(RunApi::Core::ValidationError, /model must be one of: flux-kontext-max, flux-kontext-pro/)
    end

    it "raises ValidationError when prompt is missing" do
      expect { text_to_image.create(model: "flux-kontext-pro") }
        .to raise_error(RunApi::Core::ValidationError, /prompt is required/)
    end

    it "raises ValidationError for invalid model" do
      expect { text_to_image.create(model: "invalid", prompt: "test") }
        .to raise_error(RunApi::Core::ValidationError, /model must be one of: flux-kontext-max, flux-kontext-pro/)
    end

    it "raises ValidationError for invalid aspect_ratio" do
      expect { text_to_image.create(model: "flux-kontext-pro", prompt: "test", aspect_ratio: "7:3") }
        .to raise_error(RunApi::Core::ValidationError, /aspect_ratio must be one of: 21:9, 16:9, 4:3, 1:1, 3:4, 9:16/)
    end

    it "raises ValidationError for invalid output_format" do
      expect { text_to_image.create(model: "flux-kontext-pro", prompt: "test", output_format: "webp") }
        .to raise_error(RunApi::Core::ValidationError, /output_format must be one of: jpeg, png/)
    end

    it "passes valid optional params without error" do
      params = {
        model: "flux-kontext-max",
        prompt: "test",
        aspect_ratio: "9:16",
        output_format: "png",
        enable_prompt_expansion: true,
        source_image_url: "https://cdn.runapi.ai/public/samples/source.jpg"
      }
      expect(http).to receive(:request).with(:post, endpoint, body: params).and_return("id" => "t1")

      text_to_image.create(**params)
    end
  end

  describe "#get" do
    it "GETs the correct endpoint" do
      expect(http).to receive(:request).with(:get, "#{endpoint}/task-1")
        .and_return("id" => "task-1", "status" => "completed")

      result = text_to_image.get("task-1")
      expect(result).to be_a(RunApi::FluxKontext::Types::TextToImageResponse)
      expect(result.status).to eq("completed")
      expect(result["status"]).to eq("completed")
    end
  end

  describe "#run" do
    it "creates then polls until complete" do
      expect(http).to receive(:request).with(:post, endpoint, body: {model: "flux-kontext-pro", prompt: "cat"})
        .and_return("id" => "task-1")

      expect(http).to receive(:request).with(:get, "#{endpoint}/task-1")
        .and_return("id" => "task-1", "status" => "processing")
      expect(http).to receive(:request).with(:get, "#{endpoint}/task-1")
        .and_return("id" => "task-1", "status" => "completed", "images" => [{"url" => "https://cdn.runapi.ai/public/samples/input.png"}])

      allow(RunApi::Core::Polling).to receive(:sleep)

      result = text_to_image.run(model: "flux-kontext-pro", prompt: "cat")
      expect(result.images.first.url).to eq("https://cdn.runapi.ai/public/samples/input.png")
      expect(result["images"].first["url"]).to eq("https://cdn.runapi.ai/public/samples/input.png")
    end
  end
end
