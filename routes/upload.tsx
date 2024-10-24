import { useSignal } from "@preact/signals";
import { HandlerContext, Handlers } from "$fresh/server.ts";
import { Button } from "../components/Button.tsx";

interface UploadState {
  success?: boolean;
  error?: string;
  filename?: string;
}

export const handler: Handlers = {
  async POST(req: Request, _ctx: HandlerContext) {
    try {
      const formData = await req.formData();
      const file = formData.get("module") as File;
      
      if (!file) {
        return new Response(JSON.stringify({ error: "No file provided" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Validate file type (only allow .zip files)
      if (!file.name.endsWith('.zip')) {
        return new Response(JSON.stringify({ error: "Only ZIP files are allowed" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Create uploads directory if it doesn't exist
      try {
        await Deno.mkdir("uploads", { recursive: true });
      } catch (e) {
        console.error("Error creating uploads directory:", e);
      }

      // Save the file
      const bytes = await file.arrayBuffer();
      const filename = `uploads/${Date.now()}_${file.name}`;
      await Deno.writeFile(filename, new Uint8Array(bytes));

      return new Response(JSON.stringify({ 
        success: true, 
        filename: file.name 
      }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};

export default function UploadPage() {
  const status = useSignal<UploadState>({});
  const uploading = useSignal(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    uploading.value = true;
    status.value = {};

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.error) {
        status.value = { error: result.error };
      } else {
        status.value = { 
          success: true, 
          filename: result.filename 
        };
        form.reset();
      }
    } catch (error) {
      status.value = { error: "Error uploading file" };
    } finally {
      uploading.value = false;
    }
  };

  return (
    <div class="p-4 mx-auto max-w-screen-md">
      <h1 class="text-4xl font-bold mb-8">Upload Module</h1>
      
      <div class="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} class="space-y-4">
          <div>
            <label 
              for="module" 
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Module File (ZIP)
            </label>
            <input
              type="file"
              id="module"
              name="module"
              accept=".zip"
              required
              class="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>

          <Button
            variant="primary"
            onClick={() => {}}
            disabled={uploading.value}
          >
            {uploading.value ? "Uploading..." : "Upload Module"}
          </Button>

          {status.value.error && (
            <div class="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
              {status.value.error}
            </div>
          )}

          {status.value.success && (
            <div class="mt-4 p-4 bg-green-50 text-green-700 rounded-md">
              Successfully uploaded: {status.value.filename}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}